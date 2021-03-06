import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Button,
    Input,
    Tag,
    Row,
    Col,
    Breadcrumb,
    Layout,
    Radio,
    Card,
    Checkbox,
    Alert,
    message
} from 'antd';
import './index.css';
import WrappedComponent from '../component/wrapComponent';
import points from '../../../../store/actions/points';
import subjects from '../../../../store/actions/subjects';
import problems from '../../../../store/actions/problems';
import SearchProblem from './problemSearch';
import BaseForm from '../component/BaseForm';

const { TextArea } = Input;
const { Content } = Layout;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const questionExample = {
    choice:'输入题目，形如--人体最大的细胞是()。注意需要考生答题部分用括号表示。',
    judgement: '输入题目，形如--计算机网络是一门很有意思的课程。注意需要考生答题部分用括号表示。',
    blank: '输入题目，形如--从计算机网络系统组成的角度看，计算机网络可以分为()和()。注意需要考生答题部分用括号表示。',
    shortAnswer: '输入题目，形如--你为什么喜欢计算机网络这门课程呢？',
    multiple: '输入题目，形如--你最喜欢的事情是()。注意需要考生答题部分用括号表示。'
}

class app extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                problemType: 'choice',
                subject: '',
                difficultyLevel: '',
                knowledgePoints: '',
                problemText: '',
                answer: '',
                choiceOptionA: '',
                choiceOptionB: '',
                choiceOptionC: '',
                choiceOptionD: '',
                multipleOptionA: '',
                multipleOptionB: '',
                multipleOptionC: '',
                multipleOptionD: '',
                multipleOptionE: '',
                multipleOptionF: '',
                score:'2',
                userId: window.localStorage.getItem('userId'),
            },
            formDataTemp: {},
            check: {},
            disable: false,
            required: true,
            type: this.props.match.params.type,
            problemType: sessionStorage.getItem('problemType'),
            problemId: sessionStorage.getItem('problemId')
        }
    }

    formRef = React.createRef();

    // 单选
    renderChoice = () => {
        const { formData, check, disable, required} = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="choiceOptionD"
                    className="problems_layout"
                    {...layout}
                >
                    <BaseForm
                        warning={check.choiceOptionA}
                        required={required}
                    >
                        <Tag color="green">选项</Tag>：输入选项内容
                        <div key='A' className="problems_option_layout">
                            <Tag color="blue">A</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项A的内容`}
                                value={formData.choiceOptionA}
                                onChange={(e) => {
                                    this.handleChangeItem(`choiceOptionA`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.choiceOptionB}
                        required={required}
                    >
                        <div key='B' className="problems_option_layout">
                            <Tag color="blue">B</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项B的内容`}
                                value={formData.choiceOptionB}
                                onChange={(e) => {
                                    this.handleChangeItem(`choiceOptionB`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.choiceOptionC}
                        required={required}
                    >
                        <div key='C' className="problems_option_layout">
                            <Tag color="blue">C</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项C的内容`}
                                value={formData.choiceOptionC}
                                onChange={(e) => {
                                    this.handleChangeItem(`choiceOptionC`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.choiceOptionD}
                        required={required}
                    >
                        <div key='D' className="problems_option_layout">
                            <Tag color="blue">D</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项D的内容`}
                                value={formData.choiceOptionD}
                                onChange={(e) => {
                                    this.handleChangeItem(`choiceOptionD`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                </Form.Item>
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：
                        <Radio.Group
                            tyle={{ marginLeft: 10 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案`}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e.target.value);
                            }}
                            disabled={disable}
                        >
                            <Radio value="A">A</Radio>
                            <Radio value="B">B</Radio>
                            <Radio value="C">C</Radio>
                            <Radio value="D">D</Radio>
                        </Radio.Group>
                    </BaseForm>
                </Form.Item>
            </div>
        )
    }

    // 多选
    renderMultiple = () => {
        const { formData, check, disable, required} = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="multipleOptionD"
                    className="problems_layout"
                    {...layout}
                >
                    <BaseForm
                        warning={check.multipleOptionA}
                        required={required}
                    >
                        <Tag color="green">选项</Tag>：输入选项内容
                        <Alert
                            style={{ width: '100%', marginTop: 10}}
                            message="至少输入四个选项内容哦"
                            type="warning"
                            showIcon
                            closable
                        />
                        <div key='A' className="problems_option_layout">
                            <Tag color="blue">A</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项A的内容`}
                                value={formData.multipleOptionA}
                                onChange={(e) => {
                                    this.handleChangeItem(`multipleOptionA`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.multipleOptionB}
                        required={required}
                    >
                        <div key='B' className="problems_option_layout">
                            <Tag color="blue">B</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项B的内容`}
                                value={formData.multipleOptionB}
                                onChange={(e) => {
                                    this.handleChangeItem(`multipleOptionB`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.multipleOptionC}
                        required={required}
                    >
                        <div key='C' className="problems_option_layout">
                            <Tag color="blue">C</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项C的内容`}
                                value={formData.multipleOptionC}
                                onChange={(e) => {
                                    this.handleChangeItem(`multipleOptionC`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    
                    <BaseForm
                        warning={check.multipleOptionD}
                        required={required}
                    >
                        <div key='D' className="problems_option_layout">
                            <Tag color="blue">D</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项D的内容`}
                                value={formData.multipleOptionD}
                                onChange={(e) => {
                                    this.handleChangeItem(`multipleOptionD`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    <BaseForm
                        warning={check.multipleOptionE}
                        required={required}
                    >
                        <div key='E' className="problems_option_layout">
                            <Tag color="blue">E</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项E的内容`}
                                value={formData.multipleOptionE}
                                onChange={(e) => {
                                    this.handleChangeItem(`multipleOptionE`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                    <BaseForm
                        warning={check.multipleOptionF}
                        required={required}
                    >
                        <div key='E' className="problems_option_layout">
                            <Tag color="blue">F</Tag>
                            <Input
                                className="problems_input_layout"
                                placeholder={`请输入选项F的内容`}
                                value={formData.multipleOptionF}
                                onChange={(e) => {
                                    this.handleChangeItem(`multipleOptionF`, e.target.value);
                                }}
                                disabled={disable}
                            />
                        </div>
                    </BaseForm>
                </Form.Item>
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：
                        <Checkbox.Group
                            style={{ marginLeft: 10 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案`}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e);
                            }}
                            disabled={disable}
                        >
                            <Checkbox value="A">A</Checkbox>
                            <Checkbox value="B">B</Checkbox>
                            <Checkbox value="C">C</Checkbox>
                            <Checkbox value="D">D</Checkbox>
                            <Checkbox value="E">E</Checkbox>
                            <Checkbox value="F">F</Checkbox>
                        </Checkbox.Group>
                    </BaseForm>
                </Form.Item>
            </div>
        )
    }
    // 填空
    renderBlank = () => {
        const { formData, check, disable, required } = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：请输入正确答案
                        <Input
                            style={{ marginTop: 5 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案，多个答案请以逗号隔开`}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e.target.value);
                            }}
                            disabled={disable}
                        />
                    </BaseForm>
                </Form.Item>
            </div>
        )
    }

    // 判断
    renderJudgement = () => {
        const { formData, check, disable, required } = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：
                        <Radio.Group
                            style={{ marginTop: 5 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案`}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e.target.value);
                            }}
                            disabled={disable}
                        >
                            <Radio value="true">对</Radio>
                            <Radio value="false">错</Radio>
                        </Radio.Group>
                    </BaseForm>   
                </Form.Item>
            </div>
        )
    }

    // 简答
    renderShortAnswer = () => {
        const { formData, check, disable, required } = this.state;
        return(
            <div className="problems_layout">
                <Form.Item
                    label=""
                    name="answer"
                    {...layout}
                >
                    <BaseForm
                        warning={check.answer}
                        required={required}
                    >
                        <Tag color="green">正确答案</Tag>：请输入正确答案
                        <TextArea
                            style={{ marginTop: 5 }}
                            className="problems_input_layout"
                            placeholder={`请输入的此题答案`}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            value={formData.answer}
                            onChange={(e) => {
                                this.handleChangeItem('answer', e.target.value);
                            }}
                            disabled={disable}
                        />
                    </BaseForm>
                </Form.Item>
            </div>
            
        )
    }

    componentDidMount() {
        const { type, formData } = this.state;
        const { getSubjects } = this.props;
        console.log('formDataTemp |||||', this.state.formDataTemp, type);
        this.setState({
            formDataTemp: formData,
        });
        this.handleTypeInit(type);
        getSubjects();
    }

    // 初始化
    handleTypeInit = (type) => {
        switch (type) {
            case 'add':
                this.setState({
                    disable: false,
                });
                break;
            case 'modify':
                this.setState({
                    disable: false,
                });
                this.handleGetDetails();
                break;
            case 'view':
                this.setState({
                    disable: true,
                });
                this.handleGetDetails();
                break;
            default:
                break;
        }
    }

    // 获取表单详情
    handleGetDetails = () => {
        const { viewProblem } = this.props;
        const { problemId, problemType } = this.state;
        viewProblem({ problemId, problemType });
        setTimeout( () => {
            const { problemDetail } = this.props;
            this.setState({
                formData: problemDetail,
            });
        }, 500);
    
    }

    // 更新字段
    handleChangeItem = (filedName, value) => {
        console.log('filedName, value', filedName, value)
        const { formData } = this.state;
        const tempFormDate = Object.assign({}, formData, { [filedName]: value });
        this.setState({
            formData: tempFormDate,
        });
        // TODO: 如果学科字段更新，则更新知识点。
        if (filedName === 'subject') {
            const { getPoints, getSubjects } = this.props;
            getSubjects();
            getPoints({ currentPage: 1, pageSize: 10, userId: window.localStorage.getItem('userId'), subjectId: value });
        }
    }

    // 字段校验
    onCheck = () => {
        const { formData, check } = this.state;
        const {
            answer,
            problemText,
            problemType,
            choiceOptionA,
            choiceOptionB,
            choiceOptionC,
            choiceOptionD,
            multipleOptionA,
            multipleOptionB,
            multipleOptionC,
            multipleOptionD,
            subject,
            difficultyLevel,
            knowledgePoints,
            score,
        } = formData;
        check.answer = !answer ? '请输入此题答案' : '';
        check.problemText = !problemText ? '请输入题目内容' : '';
        check.subject = !subject ? '请选择课程' : '';
        check.difficultyLevel = !difficultyLevel ? '请选择难度等级' : '';
        check.problemType = !problemType ? '请选择题目类型' : '';
        check.knowledgePoints = !knowledgePoints ? '请选择包含的知识点' : '';
        check.problemType = !problemType ? '请选择题目类型' : '';
        check.score = !score ? '请选择题目分数' : '';
        if (problemType === 'choice') {
            check.choiceOptionA = !choiceOptionA ? '请输入选项A的内容' : '';
            check.choiceOptionB = !choiceOptionB ? '请输入选项B的内容' : '';
            check.choiceOptionC = !choiceOptionC ? '请输入选项C的内容' : '';
            check.choiceOptionD = !choiceOptionD ? '请输入选项D的内容' : '';
        }
        if(problemType === 'multiple') {
            check.multipleOptionA = !multipleOptionA ? '请输入选项A的内容' : '';
            check.multipleOptionB = !multipleOptionB ? '请输入选项B的内容' : '';
            check.multipleOptionC = !multipleOptionC ? '请输入选项C的内容' : '';
            check.multipleOptionD = !multipleOptionD ? '请输入选项D的内容' : '';
        }
        this.setState({
            check,
        });
        return check;
    };

    // 提交
    onSubmit = () => {
        const check = this.onCheck();
        if (Object.values(check).filter((item) => !!item).length > 0) return null;
        console.log('submit提交表单',this.state.formData);
        if (!window.localStorage.getItem('userId')) {
            message.error({
                content: '无法保存，请先登录，再进行添加操作！',
                className: 'custom-class',
                style: {marginTop: '30vh'},
            });
        } else {
            const { addProblem, modifyProblem } = this.props;
            const { formData, type, problemId, problemType } = this.state;
            switch(type) {
                case 'add':
                    addProblem({...formData, answer: formData.answer.toString()});
                    setTimeout(() => {
                        const { problemAddSuccess } = this.props;
                        if(problemAddSuccess) {
                            const { formDataTemp } = this.state;
                            this.setState({
                                formData: formDataTemp
                            });
                        }
                    }, 500);
                    break;
                case 'modify':
                    modifyProblem({
                        ...this.state.formData,
                        answer: this.state.formData.answer.toString(),
                        problemId,
                    });
                    setTimeout(() => {
                        const { problemModifySuccess } = this.props;
                        if(problemModifySuccess) {
                            message.success({
                                content:'修改成功',
                                style: {marginTop: '30vh'},
                            });
                        }
                    }, 500);
                    break;
                default:
                    break;
            }
        }
    }
    
    // 渲染不同模板
    renderFormItem = () => {
        const { formData } = this.state;
        const { problemType } = formData;
        switch(problemType) {
            case 'choice':
                return this.renderChoice();
            case 'judgement':
                return this.renderJudgement();
            case 'multiple':
                return this.renderMultiple();
            case 'blank':
                return this.renderBlank();
            case 'shortAnswer':
                return this.renderShortAnswer();
            default:
                return null;
        }
    }

    render() {
        const { formData, check, disable, required, type } = this.state;
        const { problemType } = formData;
        const { subjectsList, pointsList } = this.props;
        return (
            <div className="problem_container">
                <Card title={
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>自动组卷系统</Breadcrumb.Item>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        <Breadcrumb.Item>{type === 'add' ? '增加试题' : '修改试题'}</Breadcrumb.Item>
                    </Breadcrumb>}
                    extra={
                       <Button
                            type="primary"
                            onClick={() =>{
                                this.props.history.push(`/problemList`);
                            }}
                        >
                            返回题目列表
                        </Button>
                    }
                >
                    <Content
                        className="site-layout-background"
                    >
                        <SearchProblem
                            handleChangeItem={this.handleChangeItem}
                            handleSubmit={this.onSubmit}
                            formData={formData}
                            check={check}
                            disabled={disable}
                            type={type}
                            require={required}
                            subjectsList={subjectsList}
                            pointsList={pointsList}
                        />
                        <Form
                            name="basic_template"
                            layout="vertical"
                            ref={this.formRef}
                            initialValues={formData}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            className="problems_form_layout"
                        >
                            <Form.Item
                                    label=""
                                    name="problemText"
                                    {...layout}
                                >
                                <BaseForm warning={check.problemText}>
                                    <Tag color="green">题目</Tag>：
                                    <span>{questionExample[problemType]}</span>
                                    <TextArea
                                        placeholder="请输入题目内容"
                                        autoSize={{ minRows: 3, maxRows: 6 }}
                                        style={{ marginTop: 5 }}
                                        value={formData.problemText}
                                        onChange={(e) => {
                                            this.handleChangeItem('problemText', e.target.value);
                                        }}
                                        disabled={disable}
                                    />
                                </BaseForm>
                            </Form.Item>
                            {
                                this.renderFormItem()
                            }
                            <Row>
                                <Col span={2} offset={19}>
                                    <Form.Item className="problems_layout">
                                        <Button
                                            type="primary"
                                            onClick={this.onSubmit}
                                            disabled={disable}
                                        >
                                            保存
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item className="problems_layout">
                                        <Button
                                            type="primary"
                                            disabled={disable}
                                        >
                                            取消
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    subjectsList: state.subjects.subjectsList,
    pointsList: state.points.pointsList,
    problemAddSuccess: state.problems.problemAddSuccess,
    problemDetail: state.problems.problemDetail,
    problemModifySuccess: state.problems.problemModifySuccess,
})

const mapDispatchToProps = (dispatch) => ({
    getSubjects: params => dispatch(subjects.getSubjects(params)),
    getPoints: params => dispatch(points.getPoints(params)),
    addProblem: params => dispatch(problems.addProblem(params)),
    viewProblem: params => dispatch(problems.viewProblem(params)),
    modifyProblem: params => dispatch(problems.modifyProblem(params)),
})

export default WrappedComponent(connect(
    mapStateToProps,
    mapDispatchToProps,
)(app));