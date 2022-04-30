<template>
  <section id="hero" class="hero d-flex align-items-center">

    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up">sign your documents with an e-signature</h1>
          <h2 data-aos="fade-up" data-aos-delay="400">With HandSignMe sign your documents securely</h2>
          <div data-aos="fade-up" data-aos-delay="600">
            <div class="text-center text-lg-start">
             <router-link to="/login" class="navbar-brand" href="#">
                <button type="button" class="btn btn-outline-primary btn-lg">Get Started <i class="fa fa-arrow-right" aria-hidden="true"></i>
</button>
             </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
          <img src="../assets/img/hero-img.png" class="img-fluid" alt="">
        </div>
      </div>
    </div>

  </section><!-- End Hero -->
</template>

<style>
.hero {
  width: 100%;
  height: 100vh;
}
.hero h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  color: #012970;
}
.hero h2 {
  color: #444444;
  margin: 15px 0 0 0;
  font-size: 26px;
}
.hero .btn-get-started {
  margin-top: 30px;
  line-height: 0;
  padding: 15px 40px;
  border-radius: 4px;
  transition: 0.5s;
  color: #fff;
  background: #4154f1;
  box-shadow: 0px 5px 30px rgba(65, 84, 241, 0.4);
}
.hero .btn-get-started span {
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1px;
}
.hero .btn-get-started i {
  margin-left: 5px;
  font-size: 18px;
  transition: 0.3s;
}
.hero .btn-get-started:hover i {
  transform: translateX(5px);
}
.hero .hero-img {
  text-align: right;
}
@media (min-width: 1024px) {
  .hero {
    background-attachment: fixed;
  }
}
@media (max-width: 991px) {
  .hero {
    height: auto;
    padding: 120px 0 60px 0;
  }
  .hero .hero-img {
    text-align: center;
    margin-top: 80px;
  }
  .hero .hero-img img {
    width: 80%;
  }
}
@media (max-width: 768px) {
  .hero {
    text-align: center;
  }
  .hero h1 {
    font-size: 32px;
  }
  .hero h2 {
    font-size: 24px;
  }
  .hero .hero-img img {
    width: 100%;
  }
}
</style>
