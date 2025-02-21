import { useSelector } from "react-redux";
import style from "./Stats.module.css";
import { useTranslation } from "react-i18next";

const Stats = () => {
  const { t } = useTranslation();
  const tasks = useSelector((state) => state.task.tasks);
  const minutes = useSelector((state) => state.timer.setting?.main || 0);

  console.log("Rendering Stats with tasks:", tasks);
  console.log("Minutes from Redux:", minutes);

  const getTotalActCount = () => {
    return tasks.reduce((total, task) => total + Number(task.act), 0);
  };

  const getTotalEst = () => {
    return tasks.reduce((total, task) => {
      const act = Number(task.act);
      const est = Number(task.est);
      return total + (task.done ? act : Math.max(act, est));
    }, 0);
  };

  const getFinishTimeFormat = () => {
    if (!minutes || tasks.length === 0) return "N/A";

    const now = Date.now();
    const leftEst = getTotalEst() - getTotalActCount();
    if (leftEst <= 0) return "N/A";

    const time = new Date(now + minutes * leftEst * 60000);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getFinishHourFormat = () => {
    if (!minutes || tasks.length === 0) return "N/A";

    const leftEst = getTotalEst() - getTotalActCount();
    if (leftEst <= 0) return "0h";

    return (leftEst * minutes / 60).toFixed(1) + "h";
  };

  const handleClick = () => {
    console.log("Stats section clicked!");
  };

  return tasks.length > 0 ? (
    <div className={style.container} onClick={handleClick}>
      <div className={style.item}>
        Pomos: <span className={style.number}>{getTotalActCount()}</span>
        <span className={style.seperator}>/</span>
        <span className={style.number}>{getTotalEst()}</span>
      </div>
      <div className={style.item}>
        {t("Finished At:")} <span className={style.number}>{getFinishTimeFormat()}</span> (
        {getFinishHourFormat()})
      </div>
    </div>
  ) : null;
};

export default Stats;
