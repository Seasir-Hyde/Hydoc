import { useGlobalData } from '@docusaurus/useGlobalData';

function DocItem(props) {
  const { lastUpdated } = useGlobalData();
  const docId = props.metadata.id;

  return (
    <div>
      {/* 文档内容 */}
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
      {/* 显示最后更新时间 */}
      {lastUpdated[docId] && (
        <footer>
          <p>最后由 {lastUpdated[docId].lastUpdatedBy} 于 {lastUpdated[docId].lastUpdated} 更新</p>
        </footer>
      )}
    </div>
  );
}

export default DocItem;
