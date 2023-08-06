import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController { //we are exporting from here so that we can import in other files, we're exporting a whole class here
  static async apiPostReview(req, res, next) { //static means no object/instance of class is required to call this function.
    //the req will have a body, a json part with movieid, revgiew content and the user who posts the review
    try {// try all the things and catch an error if there is one
      const movieId = parseInt(req.body.movieId)
      const review = req.body.review
      const user = req.body.user
      console.log('movieid', movieId)
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      res.json({ status: "success" }) // this is the response
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {}//here we grab the params instead of body, since params are directly in the url and not in the json part of the body
      let review = await ReviewsDAO.getReview(id)
      if (!review) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(review)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {// if nothing was changed, give error
        throw new Error(
          "unable to update review",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {}
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)
      if (!reviews) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(reviews)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}