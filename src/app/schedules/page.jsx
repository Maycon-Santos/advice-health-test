import BootstrapProvider from "../../components/BootstrapProvider";
import Sidebar from "../../components/Sidebar";
import NotesProvider from "../../components/NotesProvider";
import SchedulesSidebar from "../../components/SchedulesSidebar";
import DoctorsProvider from "../../components/DoctorsProvider";
import PatientsProvider from "../../components/PatientsProvider";
import SchedulesProvider from "../../components/SchedulesProvider";
import ScheduleList from "../../components/ScheduleList";
import styles from "./page.module.css";

export default async function Schedules() {
  const notesReq = await fetch(`${process.env.API_BASE_URL}/notes`);
  const notesData = await notesReq.json();

  const doctorsReq = await fetch(`${process.env.API_BASE_URL}/doctors`);
  const doctorsData = await doctorsReq.json();

  const patientsReq = await fetch(`${process.env.API_BASE_URL}/patients`);
  const patientsData = await patientsReq.json();

  const schedulesReq = await fetch(`${process.env.API_BASE_URL}/schedules`);
  const schedulesData = await schedulesReq.json();

  return (
    <BootstrapProvider>
      <NotesProvider value={notesData}>
        <DoctorsProvider value={doctorsData}>
          <PatientsProvider value={patientsData}>
            <SchedulesProvider value={schedulesData}>
              <main className={styles.main}>
                <div className="d-flex">
                  <div>
                    <Sidebar />
                  </div>
                  <div>
                    <SchedulesSidebar />
                  </div>
                  <div className="flex-fill">
                    <div className="container py-3 h-screen overflow-y-auto">
                      <ScheduleList />
                    </div>
                  </div>
                </div>
              </main>
            </SchedulesProvider>
          </PatientsProvider>
        </DoctorsProvider>
      </NotesProvider>
    </BootstrapProvider>
  );
}
