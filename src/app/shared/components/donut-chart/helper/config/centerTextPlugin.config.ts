import {Plugin} from 'chart.js';
import {Currency} from '@/app/core/models/auth.model';

export function centerTextPlugin(totalSpent:number,totalMax:number,currency:Currency): Plugin<'doughnut'> {
  return {
    id: 'centerTextPlugin',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.save();


      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#201F24';
      ctx.font = '700 32px Public Sans';

      const currencySymbol = currency === 'USD' ? '$' : '₾';


      const text = `${currencySymbol}${totalSpent.toFixed(0)}`;

      const firstTextY = centerY;


      ctx.fillText(text, centerX, firstTextY);


      ctx.fillStyle = '#696868';
      ctx.font = '400 12px Public Sans';


      const secondText = `of ${currencySymbol}${totalMax.toFixed(0)} limit`;
      const secondTextY = firstTextY + 20 + 8;
      ctx.fillText(secondText, centerX, secondTextY);

      ctx.restore();
    },
  }
}
