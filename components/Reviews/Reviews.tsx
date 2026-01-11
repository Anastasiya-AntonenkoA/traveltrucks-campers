import { Camper } from "@/lib/api";

interface ReviewsProps {
  reviews: Camper["reviews"];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} style={{ marginBottom: "24px" }}>
          {/* Тут буде логіка відображення імені, зірочок та коментаря */}
          <h4>{review.reviewer_name}</h4>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>  
  );
};

export default Reviews;