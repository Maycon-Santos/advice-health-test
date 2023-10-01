"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import classNames from "classnames";
import { InputMask } from "@react-input/mask";
import { validate as validateCpf } from "gerador-validador-cpf";
import { useState } from "react";
import { useDoctors } from "../DoctorsProvider";
import { useSchedules } from "../SchedulesProvider";
import { usePatients } from "../PatientsProvider";
import { assistancePattern } from "../../data/assistance";
import styles from "./ScheduleList.module.css";
import { validateBirthDate } from "../../utils/date";

export const ScheduleList = () => {
  const [editModal, setEditModal] = useState({
    open: false,
    prev_hour: "",
    hour: "",
    patient_id: "",
    status: "",
  });
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
  const { availableHours, schedules, update, remove } = useSchedules();
  const { doctors } = useDoctors();
  const { patients, register } = usePatients();
  const searchParams = useSearchParams();
  const selectedDoctor = searchParams.get("doctor") || Object.keys(doctors)[0];

  const updateSchedule = async (e) => {
    e.preventDefault();

    const data = {
      prev_hour: editModal.prev_hour,
      hour: editModal.hour,
      doctor_id: selectedDoctor,
      patient_id: editModal.patient_id,
      status: editModal.status,
    };

    await update(data);

    setEditModal({
      ...editModal,
      open: false,
    });
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

      console.log(id);

      setEditModal({
        ...editModal,
        patient_id: id,
      });

      return;
    }
  };

  return (
    <>
      <div className="list-group">
        {availableHours.map((hour) => {
          const schedule = schedules?.[hour]?.[selectedDoctor];
          const doctor = doctors[selectedDoctor];
          const patient = patients?.[schedule?.patient_id];

          return (
            <div
              key={hour}
              href="#"
              className="d-flex align-items-center list-group-item list-group-item-action"
              aria-current="true"
            >
              <span className="fs-4 pe-3">{hour}</span>
              {!schedule && (
                <button
                  className="btn btn-primary ms-auto"
                  title="Adicionar"
                  onClick={() =>
                    setEditModal({
                      open: true,
                      prev_hour: hour,
                      hour,
                      patient_id: Object.keys(patients)[0],
                      status: "scheduled",
                    })
                  }
                >
                  <i className="bi bi-plus-circle-fill" />
                </button>
              )}
              {Boolean(schedule) && (
                <>
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex">
                      <h5 className="mb-1">
                        {patient.name} ({patient.cpf})
                      </h5>
                      &nbsp;
                      <span
                        className={assistancePattern[schedule.status].textColor}
                      >
                        ({assistancePattern[schedule.status].shortLabel})
                      </span>
                    </div>
                    <small>{doctor.name}</small>
                  </div>
                  <div className="d-flex h-100">
                    <button
                      className="btn btn-danger"
                      title="Deletar"
                      onClick={() => {
                        remove({
                          hour,
                          doctor_id: selectedDoctor,
                        });
                      }}
                    >
                      <i className="bi bi-calendar-x" />
                    </button>
                    <button
                      className="btn btn-primary ms-2"
                      title="Editar"
                      onClick={() =>
                        setEditModal({
                          open: true,
                          prev_hour: hour,
                          hour,
                          patient_id: schedule.patient_id,
                          status: schedule.status,
                        })
                      }
                    >
                      <i className="bi bi-pencil-square" />
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div
        className={classNames("modal fade", styles.modal, {
          ["show"]: editModal.open,
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
                onClick={() => setEditModal({ ...editModal, open: false })}
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
                          value={editModal.patient_id}
                          onChange={(e) => {
                            setEditModal({
                              ...editModal,
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
                  value={editModal.hour}
                  onChange={(e) => {
                    setEditModal({
                      ...editModal,
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
                          hour !== editModal.hour
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
                  value={editModal.status}
                  onChange={(e) => {
                    setEditModal({
                      ...editModal,
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
                onClick={() => setEditModal({ ...editModal, open: false })}
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateSchedule}
                disabled={registerPatientForm.open}
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
