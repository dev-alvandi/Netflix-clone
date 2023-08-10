const User = require('../models/UserModel');

module.exports.addToLikedMovies = (req, res, next) => {
  try {
    const { email, data } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          const existingLikedMovies = user.likedMovies.find(
            ({ id }) => id === data.id
          );
          if (!existingLikedMovies) {
            return User.findByIdAndUpdate(
              user._id,
              {
                likedMovies: [...user.likedMovies, data],
              },
              { new: true }
            );
          }
          return res.json({ msg: 'Movie is already added to the liked list!' });
        }
        User.create({ email, likedMovies: [data] });
        return res.json({
          msg: "Movie is added successfully to the new user's liked list",
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    return res.json({ msg: 'Error adding movies to Likes list' });
  }
};

module.exports.removeFromLikedMovies = (req, res, next) => {
  const { email, movieId } = req.body;
  // console.log(movieId);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        filteredMovies = user.likedMovies.filter(({ id }) => id !== movieId);
        return User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...filteredMovies],
          },
          { new: true }
        );
      }
    })
    .then((user) => {
      return res.json({
        msg: 'Movie was deleted',
        likedMovies: user.likedMovies,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getLikedMovies = (req, res, next) => {
  try {
    const { email } = req.params;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          return res.json({ msg: 'success', likedMovies: user.likedMovies });
        }
        res.json({ msg: 'User not found' });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    return res.json({ msg: 'Error Fetching liked movies' });
  }
};
