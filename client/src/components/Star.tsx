import { Box, HStack } from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

type StarProps = {
  fillPercent: number;
};

const Star = ({ fillPercent }: StarProps) => {
  return (
    <Box position="relative" boxSize="24px">
      {/* Empty star */}
      <AiOutlineStar size={24} color="gray" />

      {/* Filled star */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width={`${fillPercent}%`}
        overflow="hidden"
      >
        <AiFillStar size={24} color="gold" />
      </Box>
    </Box>
  );
};

type StarRatingProps = {
  rating: number; // supports decimals (e.g. 3.7)
  max?: number;
};

const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
  return (
    <HStack gap={1}>
      {Array.from({ length: max }).map((_, index) => {
        const fillPercent = Math.max(0, Math.min(100, (rating - index) * 100));

        return <Star key={index} fillPercent={fillPercent} />;
      })}
    </HStack>
  );
};

export default StarRating;
