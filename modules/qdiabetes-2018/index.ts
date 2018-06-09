import qDiaMaleA from "./lib/maleA";
import qDiaMaleB from "./lib/maleB";
import qDiaMaleC from "./lib/maleC";
import qDiaFemaleA from "./lib/femaleA";
import qDiaFemaleB from "./lib/femaleB";
import qDiaFemaleC from "./lib/femaleC";

export const DISCLAIMER_TEXT: string = `The initial implementation, to be found at http://qdiabetes.org, faithfully implements QDiabetes-2018.
ClinRisk Ltd. have released this code under the GNU Affero General Public License to enable others to implement the algorithm faithfully.
However, the nature of the GNU Affero General Public License is such that we cannot prevent, for example, someone accidentally altering the coefficients, getting the inputs wrong, or just poor programming.
ClinRisk Ltd. stress, therefore, that it is the responsibility of the end user to check that the source that they receive produces the same results as the original code found at http://qdiabetes.org.
Inaccurate implementations of risk scores can lead to wrong patients being given the wrong treatment.`;

export type CommonQDiabetesInput = {
  // Age at study entry (baseline)
  age: number,

  // Second generation “atypical” antipsychotic use (including amisulpride, aripiprazole, clozapine, lurasidone,
  // olanzapine, paliperidone, quetiapine, risperidone, sertindole, or zotepine)
  atypicalAntipsychotics: boolean,

  // Corticosteroid use (British National Formulary (BNF) chapter 6.3.2 including oral or parenteral prednisolone,
  // betamethasone, cortisone, depo-medrone, dexamethasone, deflazacort, efcortesol, hydrocortisone,
  // methylprednisolone, or triamcinolone)
  corticosteroids: boolean,

  // Treated hypertension (diagnosis of hypertension and treatment with at least one antihypertensive drug)
  treatedForHypertension: boolean,

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

  // Family history of diabetes in a first degree relative
  familyDiabetes: boolean,

  // Diagnosis coronary heart disease in a first degree relative aged less than 60 years
  cardioVascularDisease: boolean,

  // Smoking status (0: non-smoker, 1: former smoker, 2: light smoker (1-9/day), 3: moderate smoker (10-19/day), or 4: heavy smoker (≥20/day))
  smokerCategory: 0 | 1 | 2 | 3 | 4,

  // Diagnosis of schizophrenia or bipolar affective disorder
  schizophreniaOrBipolar: boolean,

  // Learning disabilities
  learningDisabilities: boolean,

  // Prescribed statins
  prescribedStatins: boolean,

  // Fasting blood glucose level (optional - preferred)
  fastingBloodGlucoseLevel?: number

  // Glycated haemoglobin (HBA1c) value (optional - used if fastingBloodGlucoseLevel unavailable)
  hba1c?: number

  // Glycated haemoglobin (HBA1c) as an IFCC value (optional - used if fastingBloodGlucoseLevel unavailable)
  hba1cIfcc?: number

  // as measured by the Townsend score, where higher values indicate higher levels of material deprivation
  townsendDeprivation: number
}

export type MaleQDiabetesInput = CommonQDiabetesInput & {
  sex: 'm'
}

export type FemaleQDiabetesInput = CommonQDiabetesInput & {
  sex: 'f'

  // (Females only) Diagnosis of gestational diabetes
  gestationalDiabetes: boolean,

  // (Females only) Diagnosis of polycystic ovary syndrome
  polycysticOvarySyndrome: boolean,
}

export type QDiabetesInput = MaleQDiabetesInput | FemaleQDiabetesInput;

export function hba1cIFCCtoDCCT(ifcc: number) {
  return (ifcc / 10.929) + 2.15
}

//NB: From https://www.bmj.com/content/359/bmj.j5019
/*
Conclusions Three updated QDiabetes risk models to quantify the absolute risk of type 2 diabetes were developed and
validated: model A does not require a blood test and can be used to identify patients for fasting blood glucose (model B)
or HBA1c (model C) testing. Model B had the best performance for predicting 10 year risk of type 2 diabetes to identify
those who need interventions and more intensive follow-up, improving on current approaches. Additional external
validation of models B and C in datasets with more completely collected data on blood glucose would be valuable before
the models are used in clinical practice.
 */

export default function (i: QDiabetesInput) {
  if (i.hba1cIfcc) {
    i.hba1c = hba1cIFCCtoDCCT(i.hba1cIfcc);
  }

  if (i.sex === 'm') {
    // B is the best model where fasting blood glucose is available
    if (i.fastingBloodGlucoseLevel) {
      return qDiaMaleB(i.age,
        i.atypicalAntipsychotics ? 1 : 0,
        i.corticosteroids ? 1 : 0,
        i.cardioVascularDisease ? 1 : 0,
        i.learningDisabilities ? 1 : 0,
        i.schizophreniaOrBipolar ? 1 : 0,
        i.prescribedStatins ? 1 : 0,
        i.treatedForHypertension ? 1 : 0,
        i.bmi,
        i.ethnicity,
        i.fastingBloodGlucoseLevel,
        i.familyDiabetes ? 1 : 0,
        i.smokerCategory,
        10,
        i.townsendDeprivation);
    }

    if (i.hba1c) {
      return qDiaMaleC(i.age,
        i.atypicalAntipsychotics ? 1 : 0,
        i.corticosteroids ? 1 : 0,
        i.cardioVascularDisease ? 1 : 0,
        i.learningDisabilities ? 1 : 0,
        i.schizophreniaOrBipolar ? 1 : 0,
        i.prescribedStatins ? 1 : 0,
        i.treatedForHypertension ? 1 : 0,
        i.bmi,
        i.ethnicity,
        i.familyDiabetes ? 1 : 0,
        i.hba1c,
        i.smokerCategory,
        10,
        i.townsendDeprivation);
    }

    return qDiaMaleA(i.age,
      i.atypicalAntipsychotics ? 1 : 0,
      i.corticosteroids ? 1 : 0,
      i.cardioVascularDisease ? 1 : 0,
      i.learningDisabilities ? 1 : 0,
      i.schizophreniaOrBipolar ? 1 : 0,
      i.prescribedStatins ? 1 : 0,
      i.treatedForHypertension ? 1 : 0,
      i.bmi,
      i.ethnicity,
      i.familyDiabetes ? 1 : 0,
      i.smokerCategory,
      10,
      i.townsendDeprivation);
  } else {
    if (i.fastingBloodGlucoseLevel) {
      return qDiaFemaleB(i.age,
        i.atypicalAntipsychotics ? 1 : 0,
        i.corticosteroids ? 1 : 0,
        i.cardioVascularDisease ? 1 : 0,
        i.gestationalDiabetes ? 1 : 0,
        i.learningDisabilities ? 1 : 0,
        i.schizophreniaOrBipolar ? 1 : 0,
        i.polycysticOvarySyndrome ? 1 : 0,
        i.prescribedStatins ? 1 : 0,
        i.treatedForHypertension ? 1 : 0,
        i.bmi,
        i.ethnicity,
        i.fastingBloodGlucoseLevel,
        i.familyDiabetes ? 1 : 0,
        i.smokerCategory,
        10,
        i.townsendDeprivation);
    }

    if (i.hba1c) {
      return qDiaFemaleC(i.age,
        i.atypicalAntipsychotics ? 1 : 0,
        i.corticosteroids ? 1 : 0,
        i.cardioVascularDisease ? 1 : 0,
        i.gestationalDiabetes ? 1 : 0,
        i.learningDisabilities ? 1 : 0,
        i.schizophreniaOrBipolar ? 1 : 0,
        i.polycysticOvarySyndrome ? 1 : 0,
        i.prescribedStatins ? 1 : 0,
        i.treatedForHypertension ? 1 : 0,
        i.bmi,
        i.ethnicity,
        i.familyDiabetes ? 1 : 0,
        i.hba1c,
        i.smokerCategory,
        10,
        i.townsendDeprivation);
    }

    return qDiaFemaleA(i.age,
      i.atypicalAntipsychotics ? 1 : 0,
      i.corticosteroids ? 1 : 0,
      i.cardioVascularDisease ? 1 : 0,
      i.gestationalDiabetes ? 1 : 0,
      i.learningDisabilities ? 1 : 0,
      i.schizophreniaOrBipolar ? 1 : 0,
      i.polycysticOvarySyndrome ? 1 : 0,
      i.prescribedStatins ? 1 : 0,
      i.treatedForHypertension ? 1 : 0,
      i.bmi,
      i.ethnicity,
      i.familyDiabetes ? 1 : 0,
      i.smokerCategory,
      10,
      i.townsendDeprivation);
  }
}
