import React from "react";
import "../../css/AboutUs.css"; // Assuming you'll add your custom styles in this file

const AboutUs = () => {
  return (
    <section className="about_us">
      <div className="container">
        <div className="row-2">
          <div className="col-md-12">
            <div className="about_inner">
              <h2>About Our Hospital Management System</h2>
              <p className="about_description">
                Our Hospital Management System (HMS) is designed to streamline
                operations, improve patient care, and enhance the efficiency of
                hospital management. With an integrated platform, our HMS
                provides comprehensive tools to manage patient records,
                appointments, billing, inventory, and much more. It is built to
                meet the needs of modern healthcare facilities, ensuring that
                hospitals can provide the best care to their patients while
                maintaining smooth administrative processes.
              </p>
              <p className="about_description">
                Over the years, we have worked closely with healthcare
                professionals to develop a system that is not only functional
                but also user-friendly. Our HMS is scalable, customizable, and
                secure, making it suitable for hospitals of all sizes. Whether
                you are running a small clinic or a large multi-specialty
                hospital, our HMS can be tailored to your specific needs.
              </p>
              <p className="about_description">
                We understand the challenges faced by healthcare providers in
                managing their operations. Our HMS addresses these challenges by
                offering a suite of features that simplify tasks, reduce errors,
                and improve patient outcomes. From electronic medical records
                (EMR) to automated billing, our system is designed to make
                healthcare management easier and more efficient.
              </p>
              <h3>Meet Our Team</h3>
              <div className="team_profiles">
                <div className="profile_card">
                  <img
                    src="profile1.jpg"
                    alt="Dr. Sarah Johnson"
                    className="profile_image"
                  />
                  <h4>Dr. Sarah Johnson</h4>
                  <p className="profile_position">Chief Medical Officer</p>
                  <p className="profile_bio">
                    Dr. Sarah Johnson is a seasoned healthcare professional with
                    over 25 years of experience in the medical field. As the
                    Chief Medical Officer, she oversees the clinical aspects of
                    our HMS, ensuring that the system meets the highest
                    standards of patient care. Dr. Johnson’s expertise in
                    healthcare management and her commitment to patient welfare
                    make her an invaluable member of our team.
                  </p>
                </div>
                <div className="profile_card">
                  <img
                    src="profile2.jpg"
                    alt="John Smith"
                    className="profile_image"
                  />
                  <h4>John Smith</h4>
                  <p className="profile_position">Chief Technology Officer</p>
                  <p className="profile_bio">
                    John Smith leads our technology team with a focus on
                    innovation and quality. With a background in software
                    engineering and healthcare IT, John is responsible for the
                    development and maintenance of our HMS. His deep
                    understanding of both technology and healthcare allows us to
                    create a system that is both advanced and user-friendly.
                  </p>
                </div>
                <div className="profile_card">
                  <img
                    src="profile3.jpg"
                    alt="Emily Davis"
                    className="profile_image"
                  />
                  <h4>Emily Davis</h4>
                  <p className="profile_position">Operations Manager</p>
                  <p className="profile_bio">
                    Emily Davis ensures that our operations run smoothly. Her
                    extensive experience in project management and hospital
                    administration helps us deliver our HMS to clients on time
                    and with the highest level of service. Emily is dedicated to
                    making sure that our clients are satisfied with the system
                    and that it meets all of their operational needs.
                  </p>
                </div>
              </div>
              <h3>Our Mission</h3>
              <p className="about_description">
                Our mission is to empower healthcare providers with the tools
                they need to deliver the best possible care. We believe that
                technology can play a critical role in improving healthcare
                outcomes, and we are committed to developing solutions that make
                healthcare management more efficient, effective, and accessible.
              </p>
              <h3>Why Choose Our HMS?</h3>
              <p className="about_description">
                Our Hospital Management System stands out for its ease of use,
                comprehensive features, and robust security. Here are a few
                reasons why healthcare providers choose our HMS:
              </p>
              <ul className="about_benefits">
                <li>
                  Integrated platform for managing all aspects of hospital
                  operations
                </li>
                <li>
                  Customizable to fit the specific needs of different healthcare
                  facilities
                </li>
                <li>User-friendly interface that requires minimal training</li>
                <li>Advanced security features to protect patient data</li>
                <li>Scalable architecture to support growth and expansion</li>
                <li>
                  Dedicated customer support to ensure smooth implementation and
                  operation
                </li>
              </ul>
              <p className="about_description">
                We are proud to have helped numerous hospitals improve their
                operations and patient care. Our HMS is more than just a
                software solution; it’s a partner in your journey towards
                excellence in healthcare.
              </p>
              <p className="about_description">
                Thank you for considering our Hospital Management System. We
                look forward to working with you and helping your healthcare
                facility reach new heights of success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;