import { SHARED, error } from 'base-variation';
try{
  SHARED.applyMetrics(VARIATION);
  SHARED.applyTreatment(VARIATION, PAGE);
  SHARED.applyExperiments(VARIATION);
}catch(e){
  error(e);
}
