import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Connexion au serveur backend (ajuste l'adresse si nécessaire)
const socket = io("http://localhost:5000");

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState({
    messages: [],
    applications: [],
  });

  useEffect(() => {
    // Écoute de l'événement "nouvelle-candidature"
    socket.on("nouvelle-candidature", (data) => {
      setNotifications((prev) => ({
        ...prev,
        applications: [data, ...prev.applications],
      }));

     
    });

    // Écoute de l'événement "nouveau-message"
    socket.on("nouveau-message", (data) => {
      setNotifications((prev) => ({
        ...prev,
        messages: [
          { nom: data.email, contenu: data.contenu, date: new Date() },
          ...prev.messages,
        ],
      }));

      
    });

    return () => {
      socket.off("nouvelle-candidature");
      socket.off("nouveau-message");
    };
  }, []);

  return (
    <div className="p-4 border rounded shadow-md bg-white w-full max-w-md mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        🔔 Notifications{" "}
        {notifications.messages.length + notifications.applications.length > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
            {notifications.messages.length + notifications.applications.length}
          </span>
        )}
      </h2>

      {notifications.messages.length === 0 && notifications.applications.length === 0 ? (
        <p className="text-gray-500">Aucune nouvelle notification.</p>
      ) : (
        <>
          {/* Displaying messages */}
          {notifications.messages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Messages</h3>
              <ul className="space-y-2">
                {notifications.messages.map((notif, index) => (
                  <li key={index} className="bg-blue-50 p-3 rounded border border-blue-100">
                    <strong>{notif.nom}</strong> a envoyé un message : <em>{notif.contenu}</em>
                    <br />
                    <span className="text-xs text-gray-600">
                      {new Date(notif.date).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Displaying applications */}
          {notifications.applications.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Candidatures</h3>
              <ul className="space-y-2">
                {notifications.applications.map((notif, index) => (
                  <li
                    key={index}
                    className="bg-green-50 p-3 rounded border border-green-100"
                  >
                    <strong>{notif.nom}</strong> a postulé à l’offre{" "}
                    <em>{notif.offre}</em>
                    <br />
                    <span className="text-xs text-gray-600">
                      {new Date(notif.date).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationPanel;
