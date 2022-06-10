const passport = require("passport");

module.exports = (router) => {
  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

    router.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/ecommerce");
            console.log("auth Google");
        }
    );

  router.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
    // res.send(req.user);
  });

  router.get("/api/current_user", (req, res) => {
    // To check if the user is logged in.
    res.send(req.user);
  });
};
