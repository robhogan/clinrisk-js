import qRisk, { QRiskInput } from "../src/qrisk";

test('Correct QRisk scores when ethnicities are varied', () => {
  const common: QRiskInput = {
    gender: 'f',
    age: 40,
    atrialFibrillation: true,
    atypicalAntipsychotics: false,
    corticosteroids: false,
    migraine: false,
    rheumatoidArthritis: false,
    chronicKidneyDisease345: true,
    severeMentalIllness: false,
    systemicLupusErythematosis: false,
    treatedForHypertension: true,
    diabetesType1: true,
    diabetesType2: false,
    ethnicRisk: 0,
    bmi: 24.9337204898, // 79kg, 1.78m
    familyCardioVascularDisease: false,
    cholesterolHdlRatio: 1.5,
    systolicBloodPressure: 115,
    systolicBloodPressureStandardDeviation: 0.1,
    smokerCategory: 2,
    townsendDeprivation: 0,
  };

  // Unknown
  expect(qRisk({ ...common, ethnicRisk: 0 })).toBe(68.3770914275929);

  // White
  expect(qRisk({ ...common, ethnicRisk: 1 })).toBe(68.3770914275929);

  // Pakistani
  expect(qRisk({ ...common, ethnicRisk: 2 })).toBe(78.21433939103943);

  // Indian
  expect(qRisk({ ...common, ethnicRisk: 3 })).toBe(86.75518758928679);

  // Bangladeshi
  expect(qRisk({ ...common, ethnicRisk: 4 })).toBe(78.72671430885364);

  // Other asian
  expect(qRisk({ ...common, ethnicRisk: 5 })).toBe(71.00974034864342);

  // Black Caribbean
  expect(qRisk({ ...common, ethnicRisk: 6 })).toBe(62.114475782212544);

  // Black African
  expect(qRisk({ ...common, ethnicRisk: 7 })).toBe(54.00331372934325);

  // Chinese
  expect(qRisk({ ...common, ethnicRisk: 8 })).toBe(56.42714957065503);

  // Other
  expect(qRisk({ ...common, ethnicRisk: 9 })).toBe(62.094280406057464);
});
