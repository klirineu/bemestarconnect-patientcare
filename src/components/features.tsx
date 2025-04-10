import {
  UserRound,
  Calendar,
  CreditCard,
  ClipboardList,
  BarChart3,
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Comprehensive Healthcare Management
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything healthcare professionals need to manage their practice
            efficiently in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <UserRound className="w-6 h-6" />,
              title: "Patient Management",
              description:
                "Register patients, view histories, and track progress with searchable records and detailed profiles.",
            },
            {
              icon: <Calendar className="w-6 h-6" />,
              title: "Appointment Scheduling",
              description:
                "Calendar view with drag-and-drop functionality, automated reminders, and status indicators.",
            },
            {
              icon: <CreditCard className="w-6 h-6" />,
              title: "Financial Controls",
              description:
                "Monthly billing dashboard with payment tracking, overdue alerts, and simple reporting.",
            },
            {
              icon: <ClipboardList className="w-6 h-6" />,
              title: "Treatment Plans",
              description:
                "Create and monitor nutrition plans with customizable templates and progress visualization.",
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: "Analytics Overview",
              description:
                "Dashboard with key metrics, patient evolution charts, and business performance indicators.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
