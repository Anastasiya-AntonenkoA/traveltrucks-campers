import { Camper } from "@/lib/api";
import css from "./Reviews.module.css";

interface ReviewsProps {
  reviews: Camper["reviews"];
}

const Reviews = ({ reviews }: ReviewsProps) => {
    if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;
    
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        className={`${css.starIcon} ${i < rating ? css.starFilled : ""}`}
      >
        <use href="/icons/sprite.svg#icon-star" />
      </svg>
    ));
  };

  return (
    <div className={css.container}>
      {reviews.map((review, index) => (
        <div key={index} className={css.reviewItem}>
          <div className={css.reviewerHeader}>
            <div className={css.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className={css.infoWrapper}>
              <h4 className={css.name}>{review.reviewer_name}</h4>
              <div className={css.starsWrapper}>
                {renderStars(review.reviewer_rating)}
              </div>
            </div>
          </div>

          <p className={css.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;