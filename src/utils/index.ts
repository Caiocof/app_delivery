export const formatMoney = (number: number) => {
    const format = new Intl.NumberFormat('pt-br', {
        style:'currency',
        currency: 'BRL',
        maximumFractionDigits: 2
    })

    return format.format(number)
}