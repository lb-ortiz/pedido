import React from 'react';
import RestaurantDetails from './RestaurantDetails';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      restaurant: null,
    };
  }

  componentDidMount() {
    const host = process.env.REACT_APP_CONTENT_HOST;
    const id = this.props.match.params.id;

    fetch(`${host}/restaurants/${id}.json`)
      .then(result => result.json())
      .then(restaurant => {
        this.setState({
          restaurant: {
            ...restaurant,
            imageSrc: `${host}${restaurant.imageSrc}`,
          },
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    if (this.state.loading) {
      return 'Carregando';
    }
    if (this.state.error) {
      return 'Desculpe, Esse restaurante está indisponível.';
    }

    return <RestaurantDetails restaurant={this.state.restaurant} />;
  }
}

export default Restaurant;
