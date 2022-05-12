import { SHARED, error } from 'base-variation';
try{
  SHARED.applyMetrics(VARIATION);
  console.log("apply experiments in v0");
  SHARED.applyExperiments(VARIATION);
}catch(e){
  error(e);
}
