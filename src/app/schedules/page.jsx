import AssistanceStatistics from "@/components/AssistanceStatistics";
import BootstrapProvider from "@/components/BootstrapProvider";
import SchedulesSidebar from "@/components/HomeSchedulesSidebar";
import Sidebar from "@/components/Sidebar";
import NotesTable from "@/components/NotesTable";
import NotesProvider from "@/components/NotesProvider";
import AssistanceProvider from "@/components/AssistanceProvider";
import styles from "./page.module.css";

export default async function Schedules() {
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
              <div>Sidebar aqui</div>
              <div className="flex-fill">
                <div className="container py-5 h-screen overflow-y-auto">
                  Conteúdo aqui
                </div>
              </div>
            </div>
          </main>
        </AssistanceProvider>
      </NotesProvider>
    </BootstrapProvider>
  );
}
