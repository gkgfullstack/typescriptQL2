#!/usr/bin/env groovy

pipeline {
    agent {
        label 'master'
    }

    environment {
        FONTAWESOME_NPM_AUTH_TOKEN = credentials('bbeaf2d6-fe53-40df-bec8-26b81ce94df8')
        NODE_ENV = "production"
    }

    options {
        // only keeping the last 20 builds
        buildDiscarder(logRotator(numToKeepStr:'50'))
        disableConcurrentBuilds()
    }

    stages {
        stage('npm install') {
            steps {
                sh "npm install"
            }
        }

        stage('npm run build') {
            steps {
                sh "npm run build"
            }
        }

        stage('npm test') {
            steps {
                sh "npm test"
            }
        }

        stage('creating deployable .zip') {
            steps {
                script {
                    def version = env.BRANCH_NAME + '-' + env.BUILD_NUMBER
                    sh "zip cc-react-${version}.zip -r * .[^.]* -x '*node_modules*' -x '*.git*' -x '*Jenkinsfile*' -x '*cc-react-*.tgz*' -x '*build*' -x '*package-lock.json*'"
                }
            }
        }

        stage('Upload to S3 for EB deployment') {
            steps {
                script {
                    def build_artifact = 'cc-react-' + env.BRANCH_NAME + '-' + env.BUILD_NUMBER + '.zip'
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'npm-s3-and-beanstalk', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        sh "aws s3 cp ${build_artifact} s3://npm-elasticbeanstalk-zips-to-deploy/cc-react/"
                    }
                }
            }
        }

        stage('Deploy to Beanstalk') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'npm-s3-and-beanstalk', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        def version = env.BRANCH_NAME + '-' + env.BUILD_NUMBER
                        def build_artifact_filename = 'cc-react-' + version + '.zip'
                        sh "aws elasticbeanstalk create-application-version --application-name client-center-react --version-label ${version} --source-bundle S3Bucket=\"npm-elasticbeanstalk-zips-to-deploy\",S3Key=cc-react/${build_artifact_filename} --auto-create-application --region us-west-2"
                        if (env.BRANCH_NAME == 'staging') {
                            sh "aws elasticbeanstalk update-environment --environment-name ClientCenterReact-nutmeg --version-label ${version} --region us-west-2"
                            sh "echo \"Deployment started on ClientCenterReact-nutmeg (Branch: staging)\" | mail -s 'DEPLOYMENT STARTED ON ClientCenterReact-nutmeg' javadev@ql2.com"
                        }
                        else {
                            sh "echo 'not deploying to any beanstalk environment'"
                        }
                    }
                }
            }
        }

        stage('Set Jenkins Build Number') {
            steps {
                script {
                    // def version = getVersion()
                    def label = "${env.BRANCH_NAME}-${currentBuild.number}"
                    currentBuild.displayName = label
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
