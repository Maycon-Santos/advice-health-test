import styles from "./page.module.css";
import BootstrapProvider from "@/components/BootstrapProvider";
import Schedules from "@/components/Schedules";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <BootstrapProvider>
      <main className={styles.main}>
        <div className="d-flex">
          <div>
            <Sidebar />
          </div>
          <div className="flex-fill">
            <div className="container py-2">
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="bi bi-search"></i>
                </span>
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="searchInput"
                    placeholder="Busca"
                  />
                  <label for="searchInput">Busca</label>
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
