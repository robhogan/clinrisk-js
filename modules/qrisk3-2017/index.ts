import qRiskMale from "./lib/male";
import qRiskFemale from "./lib/female";

export const DISCLAIMER_TEXT: string = `The initial implementation, to be found at http://svn.clinrisk.co.uk/opensource/qrisk2, faithfully implements QRISK3-2017.
ClinRisk Ltd. have released this code under the GNU Lesser General Public License to enable others to implement the algorithm faithfully.
However, the nature of the GNU Lesser General Public License is such that we cannot prevent, for example, someone accidentally altering the coefficients, getting the inputs wrong, or just poor programming.
ClinRisk Ltd. stress, therefore, that it is the responsibility of the end user to check that the source that they receive produces the same results as the original code found at https://qrisk.org.
Inaccurate implementations of risk scores can lead to wrong patients being given the wrong treatment.`;

export type CommonQRiskInput = {
  // Age at study entry (baseline)
  age: number,

  // Atrial fibrillation (including atrial fibrillation, atrial flutter, and paroxysmal atrial fibrillation)
  atrialFibrillation: boolean,

  // Second generation “atypical” antipsychotic use (including amisulpride, aripiprazole, clozapine, lurasidone,
  // olanzapine, paliperidone, quetiapine, risperidone, sertindole, or zotepine)
  atypicalAntipsychotics: boolean,

  // Corticosteroid use (British National Formulary (BNF) chapter 6.3.2 including oral or parenteral prednisolone,
  // betamethasone, cortisone, depo-medrone, dexamethasone, deflazacort, efcortesol, hydrocortisone,
  // methylprednisolone, or triamcinolone)
  corticosteroids: boolean,

  // Diagnosis of migraine (including classic migraine, atypical migraine, abdominal migraine, cluster headaches,
  // basilar migraine, hemiplegic migraine, and migraine with or without aura)
  migraine: boolean,

  // Rheumatoid arthritis (diagnosis of rheumatoid arthritis, Felty’s syndrome, Caplan’s syndrome, adult onset
  // Still’s disease, or inflammatory polyarthropathy not otherwise specified)
  rheumatoidArthritis: boolean,

  // Chronic kidney disease (stage 3, 4 or 5) and major chronic renal disease (including nephrotic syndrome, chronic
  // glomerulonephritis, chronic pyelonephritis, renal dialysis, and renal transplant)
  chronicKidneyDisease345: boolean,

  // Diagnosis of severe mental illness (including psychosis, schizophrenia, or bipolar affective disease)
  severeMentalIllness: boolean,

  // Systemic lupus erythematosus (including diagnosis of SLE, disseminated lupus erythematosus, or Libman-Sacks disease)
  systemicLupusErythematosis: boolean,

  // Treated hypertension (diagnosis of hypertension and treatment with at least one antihypertensive drug)
  treatedForHypertension: boolean,

  // Diagnosis of diabetes type 2
  diabetesType1: boolean,

  // Diagnosis of diabetes type 2
  diabetesType2: boolean,

  // Body-mass index
  bmi: number,

  // Ethnic origin
  // 0: White or not stated
  // 1: White or not stated
  // 2: Indian
  // 3: Pakistani
  // 4: Bangladeshi
  // 5: Other Asian
  // 6: Black Caribbean
  // 7: Black African
  // 8: Chinese
  // 9: Other ethnic group
  ethnicity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,

  // Family history of coronary heart disease in a first degree relative aged less than 60 years
  familyCardioVascularDisease: boolean,

  // Total cholesterol to high density lipoprotein (HDL) cholesterol ratio
  cholesterolHdlRatio: number,

  // Systolic blood pressure
  systolicBloodPressure: number,

  // Measure of systolic blood pressure variability (standard deviation of repeated measures)
  systolicBloodPressureStandardDeviation: number,

  // Smoking status (0: non-smoker, 1: former smoker, 2: light smoker (1-9/day), 3: moderate smoker (10-19/day), or 4: heavy smoker (≥20/day))
  smokerCategory: 0 | 1 | 2 | 3 | 4,

  // as measured by the Townsend score, where higher values indicate higher levels of material deprivation
  townsendDeprivation: number
}

export type MaleQRiskInput = CommonQRiskInput & {
  sex: 'm'

  // Diagnosis of erectile dysfunction or treatment for erectile dysfunction (BNF chapter 7.4.5 including alprostadil,
  // phosphodiesterase type 5 inhibitors, papaverine, or phentolamine)
  diagnosisOrTreatmentErectileDysfunction: boolean
}

export type FemaleQRiskInput = CommonQRiskInput & {
  sex: 'f'
}

export type QRiskInput = MaleQRiskInput | FemaleQRiskInput;

export default function (i: QRiskInput) {
  if (i.sex === 'm') {
    return qRiskMale(i.age,
      i.atrialFibrillation ? 1 : 0,
      i.atypicalAntipsychotics ? 1 : 0,
      i.corticosteroids ? 1 : 0,
      i.diagnosisOrTreatmentErectileDysfunction ? 1 : 0,
      i.migraine ? 1 : 0,
      i.rheumatoidArthritis ? 1 : 0,
      i.chronicKidneyDisease345 ? 1 : 0,
      i.severeMentalIllness ? 1 : 0,
      i.systemicLupusErythematosis ? 1 : 0,
      i.treatedForHypertension ? 1 : 0,
      i.diabetesType1 ? 1 : 0,
      i.diabetesType2 ? 1 : 0,
      i.bmi,
      i.ethnicity,
      i.familyCardioVascularDisease ? 1 : 0,
      i.cholesterolHdlRatio,
      i.systolicBloodPressure,
      i.systolicBloodPressureStandardDeviation,
      i.smokerCategory,
      10, // Calculator only works on a 10-year span
      i.townsendDeprivation);
  } else {
    return qRiskFemale(i.age,
      i.atrialFibrillation ? 1 : 0,
      i.atypicalAntipsychotics ? 1 : 0,
      i.corticosteroids ? 1 : 0,
      i.migraine ? 1 : 0,
      i.rheumatoidArthritis ? 1 : 0,
      i.chronicKidneyDisease345 ? 1 : 0,
      i.severeMentalIllness ? 1 : 0,
      i.systemicLupusErythematosis ? 1 : 0,
      i.treatedForHypertension ? 1 : 0,
      i.diabetesType1 ? 1 : 0,
      i.diabetesType2 ? 1 : 0,
      i.bmi,
      i.ethnicity,
      i.familyCardioVascularDisease ? 1 : 0,
      i.cholesterolHdlRatio,
      i.systolicBloodPressure,
      i.systolicBloodPressureStandardDeviation,
      i.smokerCategory,
      10, // Calculator only works on a 10-year span
      i.townsendDeprivation);
  }
}
