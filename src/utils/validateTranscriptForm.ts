interface TranscriptFormData {
  year: string;
  level: string;
  s1_moyenne: string;
  s1_credits: string;
  s2_moyenne: string;
  s2_credits: string;
}

export function validateTranscriptForm(data: TranscriptFormData) {
  const errors: Partial<TranscriptFormData> = {};

  // Validate year format (YYYY-YYYY)
  if (!/^\d{4}-\d{4}$/.test(data.year)) {
    errors.year = "Format d'année invalide (ex: 2022-2023)";
  }

  // Validate level
  if (!["L1", "L2", "L3"].includes(data.level)) {
    errors.level = "Niveau invalide";
  }

  // Validate semester averages (0-20)
  [data.s1_moyenne, data.s2_moyenne].forEach((moyenne, index) => {
    const num = parseFloat(moyenne);
    if (isNaN(num)) {
      errors[`s${index + 1}_moyenne` as keyof TranscriptFormData] = "Valeur requise";
    } else if (num < 0 || num > 20) {
      errors[`s${index + 1}_moyenne` as keyof TranscriptFormData] = "Doit être entre 0 et 20";
    }
  });

  // Validate credits (0-30)
  (["s1_credits", "s2_credits"] as const).forEach((key) => {
    const credits = data[key];
    const num = parseInt(credits);
    if (isNaN(num)) {
      errors[key] = "Valeur requise";
    } else if (num < 0 || num > 30) {
      errors[key] = "Doit être entre 0 et 30";
    }
  });

  return errors;
}
