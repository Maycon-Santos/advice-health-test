import AssistanceStatistics from "@/components/AssistanceStatistics";
import BootstrapProvider from "@/components/BootstrapProvider";
import Schedules from "@/components/Schedules";
import Sidebar from "@/components/Sidebar";
import NotesTable from "@/components/NotesTable";
import NotesProvider from "@/components/NotesProvider";
import AssistanceProvider from "@/components/AssistanceProvider";
import styles from "./page.module.css";

export default async function Home() {
  const assistanceReq = await fetch(`${process.env.API_BASE_URL}/assistance`);
  const assistanceData = await assistanceReq.json();
  const notesReq = await fetch(`${process.env.API_BASE_URL}/notes`);
  const notesData = await notesReq.json();

  return (
    <BootstrapProvider>
      <NotesProvider value={notesData}>
        <AssistanceProvider value={assistanceData}>
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
                    <h2 className="fw-bold">Dashboard</h2>
                    <AssistanceStatistics assistance={assistanceData} />
                  </div>

                  <div className="mt-5">
                    <h2 className="fw-bold">Avisos & Lembretes</h2>
                    <NotesTable />
                  </div>
                </div>
              </div>
              <div>
                <Schedules />
              </div>
            </div>
          </main>
        </AssistanceProvider>
      </NotesProvider>
    </BootstrapProvider>
  );
}
