import { formatPrice } from "./helpers";

type Props = {
    amount: number;
    totalPrice: number;
    onSubmit: () => void;
}

function OrderSummary( { totalPrice, onSubmit, amount }: Props) {
  return (
    <div className="order-summary-container">
      <div className="order-summary-content">
        <div>
          <span className="amount-selected-container">
            <strong className="amount-selected">{amount}</strong>
            ITENS SELECIONADOS
          </span>
          <span className="order-summary-total">
          VALOR TOTAL DE 
            <strong className="amount-selected">
                {formatPrice(totalPrice)}
            </strong>
          </span>
        </div>
        <button 
        className="order-summary-make-order"
        onClick={onSubmit}
        >
            FAZER PEDIDO
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
