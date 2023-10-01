"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDoctors } from "../DoctorsProvider";
import { useSchedules } from "../SchedulesProvider";
import { usePatients } from "../PatientsProvider";
import { assistancePattern } from "../../data/assistance";
import Modal from "../EditScheduleModal";

export const ScheduleList = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({
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
      prev_hour: editModalData.prev_hour,
      hour: editModalData.hour,
      doctor_id: selectedDoctor,
      patient_id: editModalData.patient_id,
      status: editModalData.status,
    };

    await update(data);

    setEditModalIsOpen(false);
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
                  onClick={() => {
                    setEditModalIsOpen(true);
                    setEditModalData({
                      open: true,
                      prev_hour: hour,
                      hour,
                      patient_id: Object.keys(patients)[0],
                      status: "scheduled",
                    });
                  }}
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
                      onClick={() => {
                        setEditModalIsOpen(true);
                        setEditModalData({
                          prev_hour: hour,
                          hour,
                          patient_id: schedule.patient_id,
                          status: schedule.status,
                        });
                      }}
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
      <Modal
        formData={editModalData}
        open={editModalIsOpen}
        onChange={setEditModalData}
        onClose={() => setEditModalIsOpen(false)}
        selectedDoctor={selectedDoctor}
        onSubmit={updateSchedule}
      />
    </>
  );
};
