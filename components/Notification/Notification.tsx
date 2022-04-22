import { notification as noti } from "antd";
import { NotificationApi } from "antd/lib/notification";

const Notification = (
  type: "success" | "error" | "info" | "warning",
  message?: string,
  description?: string
) => {
  return noti[type]({
    message: message,
    description: description,
  });
};

export default Notification;
