const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export default function validate(dataForm) {
  const errors = {};

  if (!dataForm.name) {
    errors.name = "name cannot be empty, please complete it";
  }
  if (!dataForm.image) {
    errors.image = "image cannot be empty, please complete it";
  }
  if(!regex.test(dataForm.image)) {
    errors.image = "image must be a valid url"
  }
  if (!dataForm.height) {
    errors.height = "height cannot be empty, please complete it";
  }
  if (!dataForm.life_span) {
    errors.life_span = "life span cannot be empty, please complete it";
  }
  if (!dataForm.weight || dataForm.weight.length < 1) {
    errors.weight = "weight span cannot be empty, please complete it";
  }
  if (dataForm.weight.length < 2) {
    errors.weight = "weight needs a maximum and a minimum, please fill in both";
  }
  if (dataForm.weight[0] > dataForm.weight[1]) {
    errors.weight = "min weight cannot be greater than the max wieght";
  }
  if (dataForm.weight[0] < 0) {
    errors.weight = "min weight cannot be less than 0";
  }
  if (!dataForm.temperament || dataForm.temperament.length < 1) {
    errors.temperament =
      "Temperaments span cannot be empty, please complete it";
  }

  return errors;
}
