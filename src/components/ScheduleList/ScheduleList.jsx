"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import classNames from "classnames";
import { useState } from "react";
import { useDoctors } from "../DoctorsProvider";
import { useSchedules } from "../SchedulesProvider";
import { usePatients } from "../PatientsProvider";
import { assistancePattern } from "@/data/assistance";
import styles from "./ScheduleList.module.css";

export const ScheduleList = () => {
  const [editModal, setEditModal] = useState({
    open: false,
    prev_hour: "",
    hour: "",
    patient_id: "",
    status: "",
  });
  const { availableHours, schedules, update, remove } = useSchedules();
  const { doctors } = useDoctors();
  const { patients } = usePatients();
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
                  <Image
                    src={patient.photo}
                    alt=""
                    width="48"
                    height="48"
                    className="rounded-circle me-2"
                  />
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex">
                      <h5 className="mb-1">{patient.name}</h5>&nbsp;
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
              <form onSubmit={updateSchedule}>
                <div className="mb-3">
                  <label htmlFor="select-hour" className="col-form-label">
                    Paciente:
                  </label>
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
                          {patient.name}
                        </option>
                      );
                    })}
                  </select>
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
              </form>
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
