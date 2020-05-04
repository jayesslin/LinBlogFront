import React from "react";
import { http, LocalUrl, RequestPaths} from "../Constant";
import {List, message, Tag} from "antd";
interface BlogTypesCategoryProps {
    getBlogDataByType:any
}
interface BlogTypesCategoryState {
    blog_typs_cates:any
}
export class BlogTypesCategory extends React.Component<any, BlogTypesCategoryState> {
    constructor(props: any) {
        super(props);
        this.state = {
            blog_typs_cates:""
        };
    }


    componentDidMount(): void {
        this.GetBlogTypes();
    }

    GetBlogTypes = () => {
        const url = LocalUrl + RequestPaths.Get_Blog_Types_Catagory;
        http
            .get(url,)
            .then(response => {
                console.log("接口数据",response.data);
                if (response.data!=undefined){
                    this.setState({
                        blog_typs_cates: response.data
                    })
                }
            })
            .catch(error => {
                console.log("", error);
                message.error("Query Error", error);
            })
            .finally();
    };
    getBlogByTypes =(types:string)=>{
        this.props.getBlogDataByType(types);
    }
    render() {
        const { blog_typs_cates } = this.state;
        let TypelistData: any[] = [];
        for (let i = 0; i < blog_typs_cates.length; i++) {
            TypelistData.push({
                href: "",
                title: blog_typs_cates[i].blog_type,
                count:blog_typs_cates[i]["count(*)"]
            });
        }

        return (
            <div style={{width:"70%"}}>
            <List
                split={false}
                key={"types"}
                itemLayout="vertical"
                size="small"
                dataSource={TypelistData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        extra={<Tag >{item.count}</Tag>}
                    >
                        <List.Item.Meta
                            title={<a onClick={()=>this.getBlogByTypes(item.title)}>{item.title}</a>}
                        />
                        {/*{this.getItemDescri(item.content)}*/}
                    </List.Item>
                )}
            />
            </div>
        );
    }
}
