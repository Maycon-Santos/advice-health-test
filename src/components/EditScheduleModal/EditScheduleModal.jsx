import classNames from "classnames";
import { useState } from "react";
import { useSchedules } from "../SchedulesProvider";
import { assistancePattern } from "../../data/assistance";
import { usePatients } from "../PatientsProvider";
import RegisterPatientForm from "./RegisterPatientForm";
import styles from "./EditScheduleModal.module.css";

export const Modal = (props) => {
  const { onClose, open, formData, onChange, selectedDoctor, onSubmit } = props;
  const { availableHours, schedules } = useSchedules();
  const { patients, register } = usePatients();

  const [registerPatientIsOpen, setRegisterPatientIsOpen] = useState(false);

  const [registerPatientData, setRegisterPatientData] = useState({
    name: "",
    cpf: "",
    address: "",
    birthDate: "",
  });

  const registerPatient = async () => {
    const { name, address, birthDate, cpf } = registerPatientData;

    const id = await register({
      name,
      address,
      birthDate,
      cpf,
    });

    setRegisterPatientIsOpen(false);

    onChange({
      ...formData,
      patient_id: id,
    });
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
              {!registerPatientIsOpen && (
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
                      onClick={() => {
                        setRegisterPatientIsOpen(true);
                        setRegisterPatientData({
                          name: "",
                          cpf: "",
                          address: "",
                          birthDate: "",
                        });
                      }}
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                    </button>
                  </div>
                </>
              )}
              {registerPatientIsOpen && (
                <RegisterPatientForm
                  formData={registerPatientData}
                  onChange={setRegisterPatientData}
                  onClose={() => setRegisterPatientIsOpen(false)}
                  onSubmit={registerPatient}
                />
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
              onClick={onSubmit}
              disabled={registerPatientIsOpen}
            >
              Concluído
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
