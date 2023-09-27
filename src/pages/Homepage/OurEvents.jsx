import React from "react";
import UpcomintEvents from "../DashboardPage/UpcomingEvents";
import SectionTitle from "../../components/SectionTitle";

const OurEvents = () => {
  return (
    <div>
      <SectionTitle
        title="Our Upcoming Events"
        subTitle="''Good fortune is what happens when opportunity meets with planning''"
      />
      <UpcomintEvents />
    </div>
  );
};

export default OurEvents;
