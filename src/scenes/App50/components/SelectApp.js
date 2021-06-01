import React, { useCallback } from 'react';

export default function SelectApp({ index, setIndex }) {

    const handleSelect = useCallback( (e) => {
        const numberApp = parseInt(e.target.value);
        setIndex(numberApp);
    })

    return (
        <div className="select" style={{zIndex:30000, position:'fixed', top:100, right:0}}>
            <select value={index} onChange={handleSelect} >
                <option value="0">App 0</option>
                <option value="1">App 1</option>
                <option value="2">App 2</option>
                <option value="3">App 3</option>
                <option value="4">App 4</option>
                <option value="5">App 5</option>
                <option value="6">App 6</option>
                <option value="7">App 7</option>
                <option value="8">App 8</option>
                <option value="9">App 9</option>
                <option value="10">App 10</option>
                <option value="11">App 11</option>
                <option value="12">App 12</option>
                <option value="13">App 13</option>
                <option value="14">App 14</option>
                <option value="15">App 15</option>
                <option value="16">App 16</option>
                <option value="17">App 17</option>
                <option value="18">App 18</option>
                <option value="19">App 19</option>
                <option value="20">App 20</option>
                <option value="21">App 21</option>
                <option value="22">App 22</option>
                <option value="23">App 23</option>
                <option value="24">App 24</option>
                <option value="25">App 25</option>
                <option value="26">App 26</option>
                <option value="27">App 27</option>
                <option value="28">App 28</option>
                <option value="29">App 29</option>
                <option value="30">App 30</option>
                <option value="31">App 31</option>
                <option value="32">App 32</option>
                <option value="33">App 33</option>
                <option value="34">App 34</option>
                <option value="35">App 35</option>
                <option value="36">App 36</option>
                <option value="37">App 37</option>
                <option value="38">App 38</option>
                <option value="39">App 39</option>
                <option value="40">App 40</option>
                <option value="41">App 41</option>
                <option value="42">App 42</option>
                <option value="43">App 43</option>
                <option value="44">App 44</option>
                <option value="45">App 45</option>
                <option value="46">App 46</option>
                <option value="47">App 47</option>
                <option value="48">App 48</option>
                <option value="49">App 49</option>
            </select>
        </div>
    )
}