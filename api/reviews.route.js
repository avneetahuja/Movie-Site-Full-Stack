import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)//return all movie specific reviews
router.route("/new").post(ReviewsCtrl.apiPostReview)//post request for creating a new review
router.route("/:id")//review id
        .get(ReviewsCtrl.apiGetReview)
        .put(ReviewsCtrl.apiUpdateReview)
        .delete(ReviewsCtrl.apiDeleteReview)

export default router