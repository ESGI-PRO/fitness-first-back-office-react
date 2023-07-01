import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 1000,
  position: {
    x: "right",
    y: "top",
  },
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning",
      },
    },
    {
      type: "error",
      background: "indianred",
      duration: 2000,
      dismissible: true,
    },
  ],
});

class Notifications {
  success(message) {
    return notyf.success(message);
  }

  error(message) {
    return notyf.error(message);
  }

  info(message) {
    return notyf.info(message);
  }
}

const notifications = new Notifications();

export default notifications;
