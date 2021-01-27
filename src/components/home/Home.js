import React from "react";

import RainTest1 from "../3dScenes/RainTest1";

// import FooterTextAnimation from "./HomeFooterText";

//

function Home() {
  return (
    <React.Fragment>
      {/* --------------- */}
      {/* --------------- */}
      {/* --------------- */}

      {/* --------------- */}
      {/* --------------- */}
      {/* --------------- */}
      <section className="container-section-scene-home">
        {/* ----------------------------------------- */}
        {/*             FLAG SECTION                  */}
        {/* ----------------------------------------- */}
        <div className="scene-threejs">
          <div className="wrapper-flag-scene-threejs">
            {/* ----------------------------------------- */}

            <div className="wrapper-scene-oblivion">
              <RainTest1 />
            </div>
            {/* ----------------------------------------- */}

            <div className="scene-description-home">
              <div className="wrapper-scene-description-home">
                <h3 className="h3-text-img-home">Featured work</h3>
                <p>"Threejs tests" I created during my time at DCI.</p>
              </div>
            </div>
            {/* ----------------------------------------- */}
          </div>
        </div>
      </section>
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* <section className="container-gallery">
        <HomePortfolioGallery />
      </section> */}

      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}

      {/* ----------------------------------------- */}
      {/*             CONTACT SECTION               */}
      {/* ----------------------------------------- */}

      {/* --------------- */}
      {/* <FooterTextAnimation /> */}
    </React.Fragment>
  );
}

export default Home;
