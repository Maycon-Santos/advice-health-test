import NiceCalendar from "react-nice-calendar";
import classNames from "classnames";
import styles from "./Calendar.module.css";

export const Calendar = (props) => {
  const { className, ...rest } = props;

  return (
    <div className={classNames(className, styles.wrapper)}>
      <NiceCalendar
        daysDictionary={["D", "S", "T", "Q", "Q", "S", "S"]}
        monthsDictionary={[
          "janeiro",
          "fevereiro",
          "março",
          "abril",
          "maio",
          "junho",
          "julho",
          "agosto",
          "setembro",
          "outubro",
          "novembro",
          "dezembro",
        ]}
        {...rest}
      />
    </div>
  );
};
