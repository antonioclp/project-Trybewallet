import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { id, value, description,
              currency, method, tag, exchangeRates } = expense;

            const exchangeQuote = Number(exchangeRates[currency].ask);
            const conversion = exchangeQuote * value;
            const currencyName = (exchangeRates[currency].name);

            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{currencyName}</td>
                <td>{exchangeQuote.toFixed(2)}</td>
                <td>{conversion.toFixed(2)}</td>
                <td>Real</td>
              </tr>
            );
          })}
        </tbody>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
