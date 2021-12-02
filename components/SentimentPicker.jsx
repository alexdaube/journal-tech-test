import * as React from 'react';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Box, Stack, Rating } from '@mui/material';
import { useMemo } from 'react';

export const sentiment = {
  veryDissatisfied: {
    id: 'veryDissatisfied',
    icon: SentimentVeryDissatisfiedIcon,
    label: 'Very Dissatisfied',
    numericValue: 1,
  },
  dissatisfied: {
    id: 'dissatisfied',
    icon: SentimentDissatisfiedIcon,
    label: 'Dissatisfied',
    numericValue: 2,
  },
  neutral: {
    id: 'neutral',
    icon: SentimentSatisfiedIcon,
    label: 'Neutral',
    numericValue: 3,
  },
  satisfied: {
    id: 'satisfied',
    icon: SentimentSatisfiedAltIcon,
    label: 'Satisfied',
    numericValue: 4,
  },
  verySatisfied: {
    id: 'verySatisfied',
    icon: SentimentVerySatisfiedIcon,
    label: 'Very Satisfied',
    numericValue: 5,
  },
  lovingIt: {
    id: 'lovingIt',
    icon: FavoriteIcon,
    label: 'Loving It',
    numericValue: 6,
  },
  heartBroken: {
    id: 'heartBroken',
    icon: HeartBrokenIcon,
    label: 'Heart Broken',
    numericValue: 7,
  },
  celebrate: {
    id: 'celebrate',
    icon: CelebrationIcon,
    label: 'Ready to Celebrate',
    numericValue: 8,
  },
};

const sentiments = Object.values(sentiment);

function IconContainer(props) {
  const { value, ...other } = props;

  const Icon = useMemo(() => {
    return sentiments.find((s) => s.numericValue === value).icon;
  }, [value]);

  return (
    <span {...other}>
      <Icon />
    </span>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function SentimentPicker({ value, onChange, ...propsRest }) {
  return (
    <Stack direction="row" alignItems="center">
      <Rating
        name="highlight-selected-only"
        value={value ? sentiment[value].numericValue : 0}
        onChange={(event, newValue) => {
          if (!newValue) {
            onChange(event, '');
          } else {
            onChange(
              event,
              sentiments.find((s) => s.numericValue === newValue).id
            );
          }
        }}
        IconContainerComponent={IconContainer}
        highlightSelectedOnly
        max={sentiments.length}
        {...propsRest}
      />
      <Box sx={{ ml: 2 }}>{value ? sentiment[value].label : ''}</Box>
    </Stack>
  );
}

SentimentPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
