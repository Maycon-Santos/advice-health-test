import { useState } from "react";
import { InputMask } from "@react-input/mask";
import { validate as validateCpf } from "gerador-validador-cpf";
import { validateBirthDate } from "../../../utils/date";

export const RegisterPatientForm = (props) => {
  const { onClose, formData, onChange, onSubmit } = props;

  const [errors, setErrors] = useState({
    name: "",
    cpf: "",
    address: "",
    birthDate: "",
  });

  const submit = () => {
    const errors = { name: "", cpf: "", address: "", birthDate: "" };

    const { name, address, birthDate, cpf } = formData;

    if (!name) {
      errors.name = "Campo obrigatório";
    }

    if (!validateCpf(cpf)) {
      errors.cpf = "CPF inválido";
    }

    if (!address) {
      errors.address = "Campo obrigatório";
    }

    if (!birthDate) {
      errors.birthDate = "Campo obrigatório";
    } else if (birthDate.length < 10) {
      errors.birthDate = "Data de nascimento inválida";
    } else {
      const [day, month, year] = birthDate.split("/");

      if (!validateBirthDate(new Date(`${year}-${month}-${day}`))) {
        errors.birthDate = "Data de nascimento inválida";
      }
    }

    setErrors(errors);

    const noErrors = !Object.keys(errors).find((key) => Boolean(errors[key]));

    if (noErrors) {
      onSubmit();
    }
  };

  return (
    <div className="pb-3 border-bottom">
      <div className="mb-3">
        <label htmlFor="input-name" className="col-form-label">
          Nome completo:
        </label>
        <input
          type="text"
          id="input-name"
          className="form-control"
          autoFocus
          value={formData.name}
          onChange={(e) => {
            onChange({
              ...formData,
              name: e.target.value,
            });
          }}
        />
        {errors.name && (
          <span className="d-block text-danger mt-1">{errors.name}</span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="input-cpf" className="col-form-label">
          CPF:
        </label>
        <InputMask
          mask="___.___.___-__"
          replacement={{ _: /\d/ }}
          type="text"
          id="input-cpf"
          className="form-control"
          value={formData.cpf}
          onChange={(e) => {
            onChange({
              ...formData,
              cpf: e.target.value,
            });
          }}
        />
        {errors.cpf && (
          <span className="d-block text-danger mt-1">{errors.cpf}</span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="input-address" className="col-form-label">
          Endereço:
        </label>
        <input
          type="text"
          id="input-address"
          className="form-control"
          value={formData.address}
          onChange={(e) => {
            onChange({
              ...formData,
              address: e.target.value,
            });
          }}
        />
        {errors.address && (
          <span className="d-block text-danger mt-1">{errors.address}</span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="input-birth-date" className="col-form-label">
          Data de nascimento:
        </label>
        <InputMask
          mask="__/__/____"
          replacement={{ _: /\d/ }}
          type="text"
          id="input-birth-date"
          className="form-control"
          value={formData.birthDate}
          onChange={(e) => {
            onChange({
              ...formData,
              birthDate: e.target.value,
            });
          }}
        />
        {errors.birthDate && (
          <span className="d-block text-danger mt-1">{errors.birthDate}</span>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className="btn btn-primary ms-2" onClick={submit}>
          Cadastrar
        </button>
      </div>
    </div>
  );
};
