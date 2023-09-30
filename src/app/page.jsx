import styles from "./page.module.css";
import BootstrapProvider from "@/components/BootstrapProvider";
import Schedules from "@/components/Schedules";
import Sidebar from "@/components/Sidebar";
import classNames from "classnames";

export default function Home() {
  const data = [
    {
      amount: 8,
      label: "Pacientes agendados",
      textColor: "text-body-secondary",
      icon: "bi-calendar-event",
    },
    {
      amount: 2,
      label: "Pacientes confirmados",
      textColor: "text-primary",
      icon: "bi-check2",
    },
    {
      amount: 11,
      label: "Pacientes atendidos",
      textColor: "text-success",
      icon: "bi-check2-all",
    },
    {
      amount: 1,
      label: "Pacientes que faltaram",
      textColor: "text-danger",
      icon: "bi-x-octagon",
    },
  ];

  return (
    <BootstrapProvider>
      <main className={styles.main}>
        <div className="d-flex">
          <div>
            <Sidebar />
          </div>
          <div className="flex-fill">
            <div className="container py-2">
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    placeholder="Busca"
                  />
                  <label for="searchInput">Busca</label>
                </div>
              </div>

              <div className="mt-3">
                <h2 className="fw-bold">Dashboard</h2>

                <div className="container mt-3">
                  <div className="row border">
                    {data.map(({ amount, label, icon, textColor }, index) => (
                      <div key={label} className="col">
                        <div
                          className={classNames(
                            "d-flex flex-column align-items-center py-4",
                            textColor,
                            {
                              "border-start": index > 0,
                            }
                          )}
                        >
                          <span className="fs-1 fw-bold">{amount}</span>
                          <span>{label}</span>
                          <i className={classNames("bi fs-4 mt-2", icon)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Schedules />
          </div>
        </div>
      </main>
    </BootstrapProvider>
  );
}
