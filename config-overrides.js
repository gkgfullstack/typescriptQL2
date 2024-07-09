const path = require('path');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        localIdentName: "[name]__[local]__[hash:base64:5]",
        modifyVars: { 'hack': `true; @import "${path.join(__dirname, './src/cc-ant-design-theme.less')}";` },
    })
);
