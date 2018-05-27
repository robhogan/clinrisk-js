import qDiabetes, { QDiabetesInput } from "../modules/qdiabetes-2018";

// The following results have been verified against the web-based calculator
test('Correct QDiabetes A scores when ethnicities are varied', () => {
  const common: QDiabetesInput = {
    sex: 'f',
    age: 40,
    atypicalAntipsychotics: true,
    corticosteroids: true,
    treatedForHypertension: true,
    familyDiabetes: true,
    ethnicity: 0,
    bmi: 24.9337204898, // 79kg, 1.78m
    smokerCategory: 2,
    townsendDeprivation: 0,
    cardioVascularDisease: true,
    schizophreniaOrBipolar: true,
    prescribedStatins: true,
    learningDisabilities: true,
    gestationalDiabetes: true,
    polycysticOvarySyndrome: true
  };

  // Unknown
  expect(qDiabetes({ ...common, ethnicity: 0 })).toBe(90.04949052801783);

  // White
  expect(qDiabetes({ ...common, ethnicity: 1 })).toBe(90.04949052801783);

  // Pakistani
  expect(qDiabetes({ ...common, ethnicity: 2 })).toBe(99.87989842056716);

  // Indian
  expect(qDiabetes({ ...common, ethnicity: 3 })).toBe(99.9855068580295);

  // Bangladeshi
  expect(qDiabetes({ ...common, ethnicity: 4 })).toBe(99.99991688174079);

  // Other asian
  expect(qDiabetes({ ...common, ethnicity: 5 })).toBe(99.91954993798531);

  // Black Caribbean
  expect(qDiabetes({ ...common, ethnicity: 6 })).toBe(97.03157683402006);

  // Black African
  expect(qDiabetes({ ...common, ethnicity: 7 })).toBe(95.35217040818745);

  // Chinese
  expect(qDiabetes({ ...common, ethnicity: 8 })).toBe(99.61958959889803);

  // Other
  expect(qDiabetes({ ...common, ethnicity: 9 })).toBe(96.41197923715296);
});
