import classNames from "classnames";
import { InputMask } from "@react-input/mask";
import { useSchedules } from "../../SchedulesProvider";
import { assistancePattern } from "../../../data/assistance";
import { usePatients } from "../../PatientsProvider";
import styles from "./Modal.module.css";
import { useState } from "react";

export const Modal = (props) => {
  const { onClose, open, formData, onChange, selectedDoctor } = props;
  const { availableHours, schedules, update } = useSchedules();
  const { patients, register } = usePatients();

  const [registerPatientForm, setRegisterPatientForm] = useState({
    open: false,
    name: "",
    cpf: "",
    address: "",
    birthDate: "",
  });
  const [registerPatientErrors, setRegisterPatientErrors] = useState({
    name: "",
    cpf: "",
    address: "",
    birthDate: "",
  });

  const updateSchedule = async (e) => {
    e.preventDefault();

    const data = {
      prev_hour: formData.prev_hour,
      hour: formData.hour,
      doctor_id: selectedDoctor,
      patient_id: formData.patient_id,
      status: formData.status,
    };

    await update(data);

    onClose();
  };

  const registerPatient = async () => {
    const errors = { name: "", cpf: "", address: "", birthDate: "" };

    const { name, address, birthDate, cpf } = registerPatientForm;

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

    setRegisterPatientErrors(errors);

    const noErrors = !Object.keys(errors).find((key) => Boolean(errors[key]));

    if (noErrors) {
      const { name, address, birthDate, cpf } = registerPatientForm;

      const id = await register({
        name,
        address,
        birthDate,
        cpf,
      });

      setRegisterPatientForm({ open: false });

      setEditModalData({
        ...editModalData,
        patient_id: id,
      });

      return;
    }
  };

  return (
    <div
      className={classNames("modal fade", styles.modal, {
        ["show"]: open,
      })}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Editar
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              {!registerPatientForm.open && (
                <>
                  <label htmlFor="select-hour" className="col-form-label">
                    Paciente:
                  </label>
                  <div className="d-flex">
                    <div className="w-100">
                      <select
                        className="form-select"
                        id="select-hour"
                        value={formData.patient_id}
                        onChange={(e) => {
                          onChange({
                            ...formData,
                            patient_id: e.target.value,
                          });
                        }}
                      >
                        {Object.keys(patients).map((id) => {
                          const patient = patients[id];

                          return (
                            <option key={id} value={id}>
                              {patient.name} ({patient.cpf})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <button
                      className="btn btn-primary ms-3"
                      title="Cadastrar paciente"
                      onClick={() =>
                        setRegisterPatientForm({
                          open: true,
                          name: "",
                          cpf: "",
                          address: "",
                          birthDate: "",
                        })
                      }
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                    </button>
                  </div>
                </>
              )}
              {registerPatientForm.open && (
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
                      value={registerPatientForm.name}
                      onChange={(e) => {
                        setRegisterPatientForm({
                          ...registerPatientForm,
                          name: e.target.value,
                        });
                      }}
                    />
                    {registerPatientErrors.name && (
                      <span className="d-block text-danger mt-1">
                        {registerPatientErrors.name}
                      </span>
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
                      value={registerPatientForm.cpf}
                      onChange={(e) => {
                        setRegisterPatientForm({
                          ...registerPatientForm,
                          cpf: e.target.value,
                        });
                      }}
                    />
                    {registerPatientErrors.cpf && (
                      <span className="d-block text-danger mt-1">
                        {registerPatientErrors.cpf}
                      </span>
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
                      value={registerPatientForm.address}
                      onChange={(e) => {
                        setRegisterPatientForm({
                          ...registerPatientForm,
                          address: e.target.value,
                        });
                      }}
                    />
                    {registerPatientErrors.address && (
                      <span className="d-block text-danger mt-1">
                        {registerPatientErrors.address}
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="input-birth-date"
                      className="col-form-label"
                    >
                      Data de nascimento:
                    </label>
                    <InputMask
                      mask="__/__/____"
                      replacement={{ _: /\d/ }}
                      type="text"
                      id="input-birth-date"
                      className="form-control"
                      value={registerPatientForm.birthDate}
                      onChange={(e) => {
                        setRegisterPatientForm({
                          ...registerPatientForm,
                          birthDate: e.target.value,
                        });
                      }}
                    />
                    {registerPatientErrors.birthDate && (
                      <span className="d-block text-danger mt-1">
                        {registerPatientErrors.birthDate}
                      </span>
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setRegisterPatientForm({ open: false })}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary ms-2"
                      onClick={registerPatient}
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="select-hour" className="col-form-label">
                Horário:
              </label>
              <select
                className="form-select"
                id="select-hour"
                value={formData.hour}
                onChange={(e) => {
                  onChange({
                    ...formData,
                    hour: e.target.value,
                  });
                }}
              >
                {availableHours.map((hour) => {
                  return (
                    <option
                      key={hour}
                      value={hour}
                      disabled={
                        Boolean(schedules?.[hour]?.[selectedDoctor]) &&
                        hour !== formData.hour
                      }
                    >
                      {hour}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="select-status" className="col-form-label">
                Status:
              </label>
              <select
                className="form-select"
                id="select-status"
                value={formData.status}
                onChange={(e) => {
                  onChange({
                    ...formData,
                    status: e.target.value,
                  });
                }}
              >
                {["scheduled", "confirmed", "treated", "missing"].map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                      className={assistancePattern[status].textColor}
                    >
                      {assistancePattern[status].shortLabel}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Fechar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateSchedule}
              // disabled={registerPatientForm.open}
            >
              Concluído
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
