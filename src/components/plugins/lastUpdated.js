module.exports = function (context, options) {
    return {
      name: 'last-updated-plugin',
      async contentLoaded({ content, actions }) {
        const { setGlobalData } = actions;
        const lastUpdatedData = {};
  
        // 假设文档的最后更新时间存储在某个地方
        content.docs.forEach(doc => {
          lastUpdatedData[doc.id] = {
            lastUpdated: doc.lastUpdated, // 获取实际的更新时间
            lastUpdatedBy: doc.lastUpdatedBy // 获取更新时间的作者
          };
        });
  
        setGlobalData({ lastUpdated: lastUpdatedData });
      },
    };
  };
  