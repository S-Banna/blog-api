const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const prisma = require("./prisma");

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await prisma.user.findUnique({ where: { username } });
			if (!user) return done(null, false);

			const match = await bcrypt.compare(password, user.password);
			if (!match) return done(null, false);

			return done(null, user);
		} catch (err) {
			return done(err);
		}
	})
);
