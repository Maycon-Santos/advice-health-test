import AssistanceStatistics from "@/components/AssistanceStatistics";
import BootstrapProvider from "@/components/BootstrapProvider";
import HomeSchedulesSidebar from "@/components/HomeSchedulesSidebar";
import Sidebar from "@/components/Sidebar";
import NotesTable from "@/components/NotesTable";
import NotesProvider from "@/components/NotesProvider";
import AssistanceProvider from "@/components/AssistanceProvider";
import DoctorsProvider from "@/components/DoctorsProvider";
import PatientsProvider from "@/components/PatientsProvider";
import styles from "./page.module.css";

export default async function Home() {
  const assistanceReq = await fetch(`${process.env.API_BASE_URL}/assistance`);
  const assistanceData = await assistanceReq.json();

  const notesReq = await fetch(`${process.env.API_BASE_URL}/notes`);
  const notesData = await notesReq.json();

  const doctorsReq = await fetch(`${process.env.API_BASE_URL}/doctors`);
  const doctorsData = await doctorsReq.json();

  const patientsReq = await fetch(`${process.env.API_BASE_URL}/patients`);
  const patientsData = await patientsReq.json();

  return (
    <BootstrapProvider>
      <NotesProvider value={notesData}>
        <AssistanceProvider value={assistanceData}>
          <DoctorsProvider value={doctorsData}>
            <PatientsProvider value={patientsData}>
              <main className={styles.main}>
                <div className="d-flex">
                  <div>
                    <Sidebar />
                  </div>
                  <div className="flex-fill">
                    <div className="container py-5 h-screen overflow-y-auto">
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
                          <label htmlFor="searchInput">Busca</label>
                        </div>
                      </div>

                      <div className="mt-5">
                        <AssistanceStatistics assistance={assistanceData} />
                      </div>

                      <div className="mt-5">
                        <h2 className="fs-4 fw-bold">Avisos & Lembretes</h2>
                        <NotesTable />
                      </div>
                    </div>
                  </div>
                  <div>
                    <HomeSchedulesSidebar />
                  </div>
                </div>
              </main>
            </PatientsProvider>
          </DoctorsProvider>
        </AssistanceProvider>
      </NotesProvider>
    </BootstrapProvider>
  );
}
