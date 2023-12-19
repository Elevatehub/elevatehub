function sortByDate(data) {
  return Object.entries(data)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
}

export const grouping = {
  groupingforTopic(data) {
    const groupedData = {}

    data.forEach((entry) => {
      const date = entry.createdAt.split('T')[0]
      const sentiment = entry.sentiment

      if (!groupedData[date]) {
        groupedData[date] = { Positive: 0, Negative: 0, Netral: 0 }
      }

      groupedData[date][sentiment] = (groupedData[date][sentiment] || 0) + 1
    })

    const sortedData = sortByDate(groupedData)
    const dates = Object.keys(sortedData)

    const lastDate = dates[dates.length - 1]
    const lastObject = sortedData[lastDate]
    const result1 = {
      name: lastDate,
      data: {
        Positive: lastObject['Positive'] || 0,
        Netral: lastObject['Netral'] || 0,
        Negative: lastObject['Negative'] || 0
      }
    }

    const lastDate2 = dates[dates.length - 2]
    const lastObject2 = sortedData[lastDate2]
    const result2 = {
      name: lastDate2,
      data: {
        Positive: lastObject2['Positive'] || 0,
        Netral: lastObject2['Netral'] || 0,
        Negative: lastObject2['Negative'] || 0
      }
    }

    const lastDate3 = dates[dates.length - 3]
    const lastObject3 = sortedData[lastDate3]
    const result3 = {
      name: lastDate3,
      data: {
        Positive: lastObject3['Positive'] || 0,
        Netral: lastObject3['Netral'] || 0,
        Negative: lastObject3['Negative'] || 0
      }
    }

    const lastDate4 = dates[dates.length - 4]
    const lastObject4 = sortedData[lastDate4]
    const result4 = {
      name: lastDate4,
      data: {
        Positive: lastObject4['Positive'] || 0,
        Netral: lastObject4['Netral'] || 0,
        Negative: lastObject4['Negative'] || 0
      }
    }

    const result = [result4, result3, result2, result1]

    const convertedData = Object.keys(result[0].data).map((sentiment) => {
      return {
        name: sentiment.toLowerCase(),
        data: result.map((entry) => entry.data[sentiment])
      }
    })

    return { data: convertedData, label: result }
  },

  groupingBySosmed(data) {
    const groupedData = {}

    data.forEach((entry) => {
      const date = entry.createdAt.split('T')[0]
      const brand = entry.type

      if (!groupedData[date]) {
        groupedData[date] = { News: 0, Facebook: 0, Tiktok: 0, Instagram: 0, Twitter: 0 }
      }

      groupedData[date][brand] = (groupedData[date][brand] || 0) + 1
    })

    const sortedData = sortByDate(groupedData)
    const dates = Object.keys(sortedData)
    const lastDate = dates[dates.length - 1]
    const lastObject = sortedData[lastDate]
    const result1 = {
      name: lastDate,
      data: {
        News: lastObject['News'] || 0,
        Tiktok: lastObject['Tiktok'] || 0,
        Facebook: lastObject['Facebook'] || 0,
        Instagram: lastObject['Instagram'] || 0,
        Twitter: lastObject['Twitter'] || 0
      }
    }
    const lastDate2 = dates[dates.length - 2]
    const lastObject2 = sortedData[lastDate2]
    const result2 = {
      name: lastDate2,
      data: {
        News: lastObject2['News'] || 0,
        Tiktok: lastObject2['Tiktok'] || 0,
        Facebook: lastObject2['Facebook'] || 0,
        Instagram: lastObject2['Instagram'] || 0,
        Twitter: lastObject2['Twitter'] || 0
      }
    }
    const lastDate3 = dates[dates.length - 3]
    const lastObject3 = sortedData[lastDate3]
    const result3 = {
      name: lastDate3,
      data: {
        News: lastObject3['News'] || 0,
        Tiktok: lastObject3['Tiktok'] || 0,
        Facebook: lastObject3['Facebook'] || 0,
        Instagram: lastObject3['Instagram'] || 0,
        Twitter: lastObject3['Twitter'] || 0
      }
    }
    const lastDate4 = dates[dates.length - 4]
    const lastObject4 = sortedData[lastDate4]
    const result4 = {
      name: lastDate4,
      data: {
        News: lastObject4['News'] || 0,
        Tiktok: lastObject4['Tiktok'] || 0,
        Facebook: lastObject4['Facebook'] || 0,
        Instagram: lastObject4['Instagram'] || 0,
        Twitter: lastObject4['Twitter'] || 0
      }
    }

    const result = [result4, result3, result2, result1]

    const convertedData = Object.keys(result[0].data).map((sentiment) => {
      return {
        name: sentiment,
        data: result.map((entry) => entry.data[sentiment])
      }
    })
    return { data: convertedData, label: result }
  },

  groupingHashtag(data) {
    const groupedByTitle = data.reduce((acc, current) => {
      const { title, ...rest } = current
      if (!acc[title]) {
        acc[title] = []
      }
      acc[title].push(rest)
      return acc
    }, {})

    const groupedEntities = Object.entries(groupedByTitle)
      .map(([title, entities]) => ({
        title,
        entities: entities.length
      }))
      .sort((a, b) => b.entities - a.entities)
    const getTopTen = groupedEntities.filter((data, index) => index <= 10)
    return getTopTen
  },

  groupingByDate(data) {
    const groupedData = {}

    data.forEach((entry) => {
      const date = entry.createdAt.split('T')[0]

      if (!groupedData[date]) {
        groupedData[date] = 1 // Initialize count to 1 for a new date
      } else {
        groupedData[date] += 1 // Increment count for existing date
      }
    })
    return groupedData
  }
}
