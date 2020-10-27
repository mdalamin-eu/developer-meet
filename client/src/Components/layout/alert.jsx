import React from "react";

const Alert = ({alerts}) =>
alerts !== 0 && 
alerts.length > 0 &&
alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
));

export default Alert;