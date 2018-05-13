import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import Grid from 'material-ui/Grid';
import { Theme, WithStyles } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import {
  SetNegativeValuation,
  SetPositiveValuation,
} from '../../state/indicator/actions';

export interface Props {
  indicator: Indicator

  positiveValuation(id: string): void
  
  negativeValuation(id: string): void

}

type ClassNames = WithStyles<'root' | 'title' | 'textCentered' | 'positiveButton' | 'negativeButton' >

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  } as React.CSSProperties,
  title: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: '#1D4E2C',
  } as React.CSSProperties,
  textCentered: {
    display: 'inline-block'
  } as React.CSSProperties,
  positiveButton: {
    color: 'white',
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  negativeButton: {
    color: 'white',
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
});

const getClassName = (indicator: Indicator, buttonType: string): string => {

  if (indicator.valuation === -1 && buttonType === 'negative') {
    return ' negative-selected'
  } else if (indicator.valuation === 1 && buttonType === 'negative') {
    return ' negative-unselected'
  } else if (indicator.valuation === 1 && buttonType === 'positive') {
    return ' positive-selected'
  } else if (indicator.valuation === -1 && buttonType === 'positive') {
    return ' positive-unselected'
  }
  return '';
} 

const IndicatorRatingLine: React.SFC<Props & ClassNames> = (props) => {
  const {classes, positiveValuation, negativeValuation, indicator} = props;
  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={8} >
        Einen hohe/n Anteil {indicator.name} ist für mich
      </Grid>
      <Grid item xs={4}>
        <Button 
          variant="raised"
          component="span"
          className={classes.positiveButton + getClassName(indicator, 'positive')}
          onClick={() => positiveValuation(indicator.id)}
        >
          <Icon>sentiment_satisfied</Icon>
          positiv
        </Button>
        <Button
          className={classes.negativeButton + getClassName(indicator, 'negative')}
          variant="raised"
          component="span"
          onClick={() => negativeValuation(indicator.id)}
        >
            <Icon>sentiment_dissatisfied</Icon>
            negativ
        </Button>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
  positiveValuation: SetPositiveValuation,
  negativeValuation: SetNegativeValuation,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps))
  (IndicatorRatingLine);