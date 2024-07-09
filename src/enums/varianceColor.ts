
import auth from 'src/services/auth';

const skinName = auth.getSkin();

enum VARIANCE_COLORS {
  negative = '#DAA136',
  similar = '#9ca2a3',
  positive = '#6736da',
}

enum VARIANCE_COLORS_QDASH{
  negative = '#FF9F00',
  similar = '#C4C4C4',
  positive = '#9000FF',
}

// enum VARIANCE_COLORS_EXPRETIO {
//   negative = '#DAA136',
//   similar = '#9ca2a3',
//   positive = '#6736da',
// }
enum VARIANCE_COLORS_EXPEDIA {
  negative = '#F5D9A4',
  similar = '#A34F31',
  positive = '#3B808F',
}
enum VARIANCE_COLORS_DARKMODE {
  negative = '#DAA136',
  similar = '#9ca2a3',
  positive = '#6736da',
}

//export default VARIANCE_COLORS;
export default skinName === 'ql2'
  ? VARIANCE_COLORS
  : skinName === 'qdash' ? VARIANCE_COLORS_QDASH 
  : skinName === 'expretio' ? VARIANCE_COLORS_DARKMODE
  : skinName === 'expedia' ? VARIANCE_COLORS_EXPEDIA
  : VARIANCE_COLORS;

